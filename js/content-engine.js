/**
 * INTERCARGO Dynamic Content Engine
 * Generates meaning-based content instead of just translating.
 */

const CONTENT_DATABASE = {
    customs: {
        scenarios: {
            "Germany": {
                logic: ["EU-REGULATIONS", "STRICT-INVENTORY", "ELECTRONICS-CHECK", "OWNERSHIP-PROOF"],
                ru: "Таможенное оформление при вывозе личных вещей из Германии требует точной описи имущества и соблюдения европейских норм. Особое внимание уделяется электронике, бытовой технике и документальному подтверждению права собственности в условиях действующих экспортных ограничений ЕС.",
                en: "Customs clearance for exporting personal belongings from Germany requires a precise inventory and strict compliance with EU regulations. Special attention is given to electronics, household appliances, and mandatory proof of ownership for high-value items."
            },
            "UAE": {
                logic: ["RELIGIOUS-RESTRICTIONS", "CULTURAL-SENSITIVITY", "EXPORT-PERMITS", "PRE-INSPECTION"],
                ru: "При отправке груза из ОАЭ критически важно учитывать местные религиозные и культурные ограничения на вывоз определенных категорий. Таможенное оформление требует предварительной инспекции состава груза и получения специальных разрешений на вывоз личных вещей и предметов роскоши.",
                en: "Shipping from the UAE involves strict adherence to local cultural and religious export protocols. Customs clearance requires pre-shipment inspections and specific permits for various categories of personal effects and luxury goods."
            },
            "France": {
                logic: ["EU-MEMBER", "CULTURAL-HERITAGE", "FURNITURE-FOCUS", "ANTIQUE-RULES"],
                ru: "Экспорт из Франции подразумевает строгий контроль за культурными ценностями и антиквариатом. При перевозке мебели и личных вещей требуется детальное декларирование, подтверждающее, что предметы не представляют исторической ценности для республики.",
                en: "Exporting from France requires specialized handling of cultural assets and antiques. Moving furniture and personal effects involves detailed declarations to ensure compliance with French heritage protection laws."
            }
        }
    },
    hero: {
        // Logic for hero sections to be added later
    }
};

/**
 * Main function to update a block based on parameters
 */
function updateDynamicBlock(blockId, params) {
    const { country_from, language } = params;
    const block = document.getElementById(blockId);
    if (!block) return;

    if (blockId === 'customs-dynamic-content') {
        const scenario = CONTENT_DATABASE.customs.scenarios[country_from];
        if (scenario) {
            const text = scenario[language] || scenario['en'];

            // Generate HTML structure for the block
            block.innerHTML = `
                <div class="customs-content">
                    <div class="customs-logic-tags">
                        ${scenario.logic.map(tag => `<span class="logic-tag">#${tag}</span>`).join('')}
                    </div>
                    <p class="customs-text">${text}</p>
                    <div class="customs-meta">
                        <span class="meta-label">Локация:</span> ${country_from} | 
                        <span class="meta-label">Статус:</span> Актуально для 2024-2025
                    </div>
                </div>
            `;
        }
    }
}

// Initial state
const pageParams = {
    language: 'ru',
    country_from: 'Germany',
    country_to: 'Russia',
    cargo_type: 'personal_items'
};

// Listen for custom events or manual triggers
window.addEventListener('contentUpdate', (e) => {
    const newParams = { ...pageParams, ...e.detail };
    renderPage(newParams);
});

function renderPage(params) {
    updateDynamicBlock('customs-dynamic-content', params);
    // Add other blocks as they are implemented
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add a simple control panel for the demo
    const controls = document.createElement('div');
    controls.className = 'demo-controls';
    controls.innerHTML = `
        <div class="controls-container">
            <select id="country-select">
                <option value="Germany" selected>Германия</option>
                <option value="UAE">ОАЭ</option>
                <option value="France">Франция</option>
            </select>
            <select id="lang-select">
                <option value="ru" selected>RU</option>
                <option value="en">EN</option>
            </select>
            <span class="controls-label">Тест динамики:</span>
        </div>
    `;
    document.body.appendChild(controls);

    document.getElementById('country-select').addEventListener('change', (e) => {
        pageParams.country_from = e.target.value;
        renderPage(pageParams);
    });

    document.getElementById('lang-select').addEventListener('change', (e) => {
        pageParams.language = e.target.value;
        renderPage(pageParams);
    });

    renderPage(pageParams);
});
