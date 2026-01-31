/**
 * INTERCARGO Dynamic Content Engine v5 - PRODUCTION
 * Main entry point - imports all modules and initializes the system
 */

import { CITIES_DATABASE } from './data/cities.js';
import { ROUTES_DE_RU } from './data/routes-de-ru.js';
import { ROUTES_RU_DE } from './data/routes-ru-de.js';
import { updatePageContent } from './core/engine.js';

// Combine all routes data
const ALL_ROUTES = {
    'Germany_Russia': ROUTES_DE_RU,
    'Russia_Germany': ROUTES_RU_DE
};

// Page state
const pageParams = {
    language: 'ru',
    from_city: 'Berlin',
    to_city: 'Moscow'
};

// Render function
function render() {
    updatePageContent(pageParams, CITIES_DATABASE, ALL_ROUTES);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Create demo control panel
    createControlPanel();

    // Initial render
    render();
});

/**
 * Create control panel for demo/testing
 */
function createControlPanel() {
    const controls = document.createElement('div');
    controls.className = 'demo-controls';

    let fromOptions = "";
    let toOptions = "";

    for (const country in CITIES_DATABASE) {
        for (const city in CITIES_DATABASE[country]) {
            fromOptions += `<option value="${city}">${city}</option>`;
            toOptions += `<option value="${city}">${city}</option>`;
        }
    }

    controls.innerHTML = `
        <div class="controls-container">
            <label>From:</label>
            <select id="from-city-select">${fromOptions}</select>
            <label>To:</label>
            <select id="to-city-select">${toOptions}</select>
            <label>Lang:</label>
            <select id="lang-select">
                <option value="ru" selected>RU</option>
                <option value="en">EN</option>
            </select>
        </div>
    `;
    document.body.appendChild(controls);

    document.getElementById('from-city-select').value = 'Berlin';
    document.getElementById('to-city-select').value = 'Moscow';

    // Event listeners
    ['from-city', 'to-city', 'lang'].forEach(id => {
        document.getElementById(`${id}-select`).addEventListener('change', (e) => {
            const key = id.replace('-', '_');
            pageParams[key] = e.target.value;
            render();
        });
    });
}
