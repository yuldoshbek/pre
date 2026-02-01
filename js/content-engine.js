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

// Default State
const DEFAULT_STATE = {
    language: 'ru',
    from_city: 'Berlin',
    to_city: 'Moscow'
};

// Current State
let pageParams = { ...DEFAULT_STATE };

/**
 * ROUTER LOGIC
 * Handles URL parsing and state updates
 */

function parseUrl() {
    const path = window.location.pathname;
    // Expected format: /international-moving/from-to
    // Example: /international-moving/berlin-moscow

    // Check if we are on the main landing or a specific route
    // Note: Netlify rewrites will handle the server side to serve index.html
    const match = path.match(/\/international-moving\/([a-z-]+)-([a-z-]+)/);

    if (match) {
        const fromSlug = match[1];
        const toSlug = match[2];

        // Find cities by slug
        const fromCity = findCityBySlug(fromSlug);
        const toCity = findCityBySlug(toSlug);

        if (fromCity && toCity) {
            return {
                from_city: fromCity.name,
                to_city: toCity.name,
                language: 'ru' // Default to RU for now, logic could be extended
            };
        }
    }

    return DEFAULT_STATE;
}

function findCityBySlug(slug) {
    for (const country in CITIES_DATABASE) {
        for (const cityName in CITIES_DATABASE[country]) {
            if (CITIES_DATABASE[country][cityName].slug === slug) {
                return { name: cityName, ...CITIES_DATABASE[country][cityName] };
            }
        }
    }
    return null;
}

function updateUrl(fromCity, toCity) {
    const cityFromObj = CITIES_DATABASE['Germany'][fromCity] || CITIES_DATABASE['Russia'][fromCity];
    const cityToObj = CITIES_DATABASE['Germany'][toCity] || CITIES_DATABASE['Russia'][toCity];

    if (cityFromObj && cityToObj) {
        const url = `/international-moving/${cityFromObj.slug}-${cityToObj.slug}`;
        window.history.pushState({ from_city: fromCity, to_city: toCity }, '', url);
    }
}

// Render function
function render() {
    updatePageContent(pageParams, CITIES_DATABASE, ALL_ROUTES);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse URL for Deep Linking
    const urlState = parseUrl();
    pageParams = { ...pageParams, ...urlState };

    // 2. Create Controls
    createControlPanel();

    // 3. Initial Render
    render();

    // 4. Handle Back/Forward Browser Buttons
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            pageParams.from_city = event.state.from_city;
            pageParams.to_city = event.state.to_city;

            // Sync UI controls
            document.getElementById('from-city-select').value = pageParams.from_city;
            document.getElementById('to-city-select').value = pageParams.to_city;

            render();
        }
    });
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
            const fromSelected = city === pageParams.from_city ? 'selected' : '';
            const toSelected = city === pageParams.to_city ? 'selected' : '';
            fromOptions += `<option value="${city}" ${fromSelected}>${city}</option>`;
            toOptions += `<option value="${city}" ${toSelected}>${city}</option>`;
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

    // Event listeners
    ['from-city', 'to-city', 'lang'].forEach(id => {
        document.getElementById(`${id}-select`).addEventListener('change', (e) => {
            const key = id.replace('-', '_');
            pageParams[key] = e.target.value;

            // Update URL only on city changes for SEO routes
            if (key === 'from_city' || key === 'to_city') {
                updateUrl(pageParams.from_city, pageParams.to_city);
            }

            render();
        });
    });
}
