/**
 * INTERCARGO - Core Engine
 * Main rendering logic connecting to Content Platform
 */

import { updateSEO, injectSchemaOrg } from './seo.js';
import { getRouteContent } from './content-manager.js';
import { logToDemo, highlightUpdate } from './demo-helper.js';

/**
 * Main page content updater
 */
export async function updatePageContent(params, citiesDB, routesData) {
    const { from_city, to_city, language } = params;

    // Find city objects
    let cityFromObj, cityToObj, countryFrom, countryTo;

    for (const country in citiesDB) {
        if (citiesDB[country][from_city]) {
            cityFromObj = citiesDB[country][from_city];
            countryFrom = country;
        }
        if (citiesDB[country][to_city]) {
            cityToObj = citiesDB[country][to_city];
            countryTo = country;
        }
    }

    if (!cityFromObj || !cityToObj) return;

    const routeSlug = `${cityFromObj.slug}-${cityToObj.slug}`;
    const countryRouteKey = `${countryFrom}_${countryTo}`;

    // === CONTENT PLATFORM INTEGRATION ===
    // 1. Get Content (Check Store -> Generate if missing -> Return)
    logToDemo(`Checking Content Store for route: ${cityFromObj.slug} → ${cityToObj.slug}...`, 'sys');
    const routeContent = await getRouteContent(cityFromObj, cityToObj, language);
    logToDemo(`SUCCESS: Found optimized content in Store. Status: Active.`, 'hit');

    // Map the structured content back to what the render functions expect
    // This adapter layer ensures we don't need to rewrite all render functions yet
    const adapterContent = {
        hero: {
            subtitle: routeContent.blocks.hero.subtitle,
            en_subtitle: routeContent.blocks.hero.subtitle // Fallback
        },
        customs: {
            ru: routeContent.blocks.customs.text,
            en: routeContent.blocks.customs.text, // Scaling needed for EN later
            logic: routeContent.blocks.customs.tags
        },
        // Keep static fallbacks for sections not yet in Content Store
        faq: [],
        process: [],
        cargo: { items: [] }
    };

    // For now, mix in the static data for non-migrated blocks
    // In full version, ALL blocks would come from routeContent
    const legacyContent = routesData[countryRouteKey] || {};
    const finalContent = { ...legacyContent, ...adapterContent };

    // 2. Update SEO
    // Allow SEO title override from Store
    if (routeContent.seo.title) document.title = routeContent.seo.title;
    updateSEO(cityFromObj, cityToObj, language); // Legacy SEO updater
    injectSchemaOrg(cityFromObj, cityToObj, language);

    // 3. Update Breadcrumbs
    renderBreadcrumbs(cityFromObj, cityToObj, language);

    // 4. Update Hero
    // Pass the store content specifically
    renderHero(cityFromObj, cityToObj, language, finalContent, routeSlug);

    // 5. Update Subtitles
    renderSubtitles(language, finalContent, countryRouteKey);

    // 6. Update Customs
    renderCustoms(cityFromObj, cityToObj, language, finalContent);

    // 7. Update FAQ
    renderFAQ(language, finalContent);

    // 8. Update Cargo Cards
    renderCargo(language, finalContent, routeSlug);

    // 9. Update Process
    renderProcess(language, finalContent);

    // ✨ PILOT: Update New Blocks
    renderTimelines(routeContent);
    renderInternalLinks(routeContent);

    // ✨ WOW: Flash updated zones
    ['hero-subtitle', 'customs-dynamic-content', 'timelines-block-target'].forEach(id => highlightUpdate(id));
    logToDemo(`UI Synchronization complete. ${Object.keys(routeContent.blocks).length} blocks updated.`, 'sys');
}

/**
 * Render Breadcrumbs
 */
function renderBreadcrumbs(cityFrom, cityTo, language) {
    const bcContainer = document.getElementById('breadcrumbs-container');
    if (!bcContainer) return;

    const homeLabel = language === 'ru' ? "Главная" : "Home";
    const categoryLabel = language === 'ru' ? "Международные переезды" : "International Moving";
    const currentLabel = `${cityFrom[language]} → ${cityTo[language]}`;

    // SEO-friendly URL
    const routeUrl = `/international-moving/${cityFrom.slug}-${cityTo.slug}`;

    bcContainer.innerHTML = `
        <div class="breadcrumbs__container">
            <a href="/" class="breadcrumbs__link">${homeLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="/international-moving" class="breadcrumbs__link">${categoryLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="${routeUrl}" class="breadcrumbs__current" onclick="event.preventDefault();">${currentLabel}</a>
        </div>
    `;
}

/**
 * Render Hero Section
 */
function renderHero(cityFrom, cityTo, language, routeContent, routeSlug) {
    const hTitle = document.getElementById('hero-title');
    const hSub = document.getElementById('hero-subtitle');

    if (hTitle) {
        const titleText = language === 'ru'
            ? `Переезд из ${cityFrom.from} <span>${cityTo.to}</span>`
            : `Relocation from ${cityFrom.en} <span>to ${cityTo.en}</span>`;
        hTitle.innerHTML = titleText;
    }

    if (hSub) {
        const cityOverride = routeContent.city_routes?.[routeSlug];
        const subText = cityOverride
            ? (language === 'ru' ? cityOverride.hero_subtitle : cityOverride.en_hero_subtitle)
            : (language === 'ru' ? routeContent.hero.subtitle : routeContent.hero.en_subtitle);
        hSub.innerHTML = subText;
    }
}

/**
 * Render Subtitles
 */
function renderSubtitles(language, routeContent) {
    const sections = ['what_we_transport', 'packaging'];
    sections.forEach(secId => {
        const elId = `subtitle-${secId.replace(/_/g, '-')}`;
        const el = document.getElementById(elId);
        if (el && routeContent.subtitles?.[secId]) {
            el.innerHTML = routeContent.subtitles[secId][language];
        }
    });
}

/**
 * Render Customs Block
 */
function renderCustoms(cityFrom, cityTo, language, routeContent) {
    const customsBlock = document.getElementById('customs-dynamic-content');
    if (!customsBlock || !routeContent.customs) return;

    const customs = routeContent.customs;
    customsBlock.innerHTML = `
        <div class="customs-content">
            <div class="customs-header-row">
                <div class="customs-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                </div>
                <div class="customs-logic-tags">
                    ${customs.logic.map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <p class="customs-text">${customs[language]}</p>
            <div class="customs-meta">
                <span class="meta-item">
                    <strong>Route:</strong> ${cityFrom.slug} → ${cityTo.slug}
                </span>
                <span class="meta-item">
                    <strong>Status:</strong> Verified 2024-2025
                </span>
            </div>
        </div>
    `;
}

/**
 * Render FAQ
 */
function renderFAQ(language, routeContent) {
    const faqContainer = document.getElementById('faq-dynamic-container');
    if (!faqContainer || !routeContent.faq) return;

    faqContainer.innerHTML = routeContent.faq.map(item => `
        <div class="faq__item">
            <button class="faq__question">
                <span>${language === 'ru' ? item.q : item.en_q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div class="faq__answer"><p>${language === 'ru' ? item.a : item.en_a}</p></div>
        </div>
    `).join('');

    if (typeof initFaqAccordion === 'function') initFaqAccordion();
}

/**
 * Render Cargo Cards
 */
function renderCargo(language, routeContent, routeSlug) {
    const cargoGrid = document.getElementById('cargo-grid');
    const cargoSub = document.getElementById('subtitle-cargo');

    if (!routeContent.cargo) return;

    if (cargoSub) {
        const cityOverride = routeContent.city_routes?.[routeSlug];
        const subText = cityOverride
            ? (language === 'ru' ? cityOverride.cargo_subtitle : cityOverride.en_cargo_subtitle)
            : (language === 'ru' ? "Любые личные вещи с профессиональной упаковкой." : "Any personal items with professional packing.");
        cargoSub.innerHTML = subText;
    }

    if (cargoGrid) {
        cargoGrid.innerHTML = routeContent.cargo.items.map(item => `
            <div class="cargo__item">
                <div class="cargo__item-image"><img src="${item.icon}" alt="${language === 'ru' ? item.title : item.en_title}"></div>
                <h3 class="cargo__item-title">${language === 'ru' ? item.title : item.en_title}</h3>
            </div>
        `).join('');
    }
}

/**
 * Render Process Steps
 */
function renderProcess(language, routeContent) {
    const processGrid = document.getElementById('process-grid');
    if (!processGrid || !routeContent.process) return;

    processGrid.innerHTML = routeContent.process.map((step, idx) => `
        <div class="process-card">
            <h3 class="process-card__title">${idx + 1}. ${language === 'ru' ? step.title : step.en_title}</h3>
            <p class="process-card__text">${language === 'ru' ? step.desc : step.en_desc}</p>
        </div>
    `).join('');
}

/**
 * ✨ PILOT: Render Timelines
 */
function renderTimelines(routeContent) {
    const section = document.getElementById('timelines-section');
    const target = document.getElementById('timelines-block-target');

    if (!section || !target) return;

    if (routeContent.blocks.timelines) {
        section.classList.remove('hidden');
        target.innerHTML = `<p>${routeContent.blocks.timelines.text}</p>`;
    } else {
        section.classList.add('hidden');
    }
}

/**
 * ✨ PILOT: Render Internal Links
 */
function renderInternalLinks(routeContent) {
    const section = document.getElementById('links-section');
    const target = document.getElementById('internal-links-target');

    if (!section || !target) return;

    if (routeContent.blocks.internal_links) {
        section.classList.remove('hidden');
        target.innerHTML = `<p>${routeContent.blocks.internal_links.text}</p>`;
    } else {
        section.classList.add('hidden');
    }
}
