/**
 * INTERCARGO - Core Engine
 * Main rendering logic for dynamic content generation
 */

import { updateSEO, injectSchemaOrg } from './seo.js';

/**
 * Main page content updater
 */
export function updatePageContent(params, citiesDB, routesData) {
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

    // Select correct route data based on direction
    const routeContent = routesData[countryRouteKey];
    if (!routeContent) {
        console.warn(`No content found for route: ${countryRouteKey}`);
        return;
    }

    // 1. Update SEO
    updateSEO(cityFromObj, cityToObj, language);
    injectSchemaOrg(cityFromObj, cityToObj, language);

    // 2. Update Breadcrumbs
    renderBreadcrumbs(cityFromObj, cityToObj, language);

    // 3. Update Hero
    renderHero(cityFromObj, cityToObj, language, routeContent, routeSlug);

    // 4. Update Subtitles
    renderSubtitles(language, routeContent, countryRouteKey);

    // 5. Update Customs
    renderCustoms(cityFromObj, cityToObj, language, routeContent);

    // 6. Update FAQ
    renderFAQ(language, routeContent);

    // 7. Update Cargo Cards
    renderCargo(language, routeContent, routeSlug);

    // 8. Update Process
    renderProcess(language, routeContent);
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

    bcContainer.innerHTML = `
        <div class="breadcrumbs__container">
            <a href="/" class="breadcrumbs__link">${homeLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <a href="/international-moving" class="breadcrumbs__link">${categoryLabel}</a>
            <span class="breadcrumbs__separator">/</span>
            <span class="breadcrumbs__current">${currentLabel}</span>
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
            <div class="customs-logic-tags">
                ${customs.logic.map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
            </div>
            <p class="customs-text">${customs[language]}</p>
            <div class="customs-meta">Route: ${cityFrom.slug} → ${cityTo.slug}</div>
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
