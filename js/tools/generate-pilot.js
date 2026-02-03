const fs = require('fs');
const path = require('path');
const COUNTRIES = require('../data/countries-europe.js');
const BLUEPRINTS = require('../core/blueprints-pilot.js');

const ROUTES_FILE = path.join(__dirname, '../data/routes-pilot.json');
const OUTPUT_FILE = path.join(__dirname, '../data/content-store-pilot.json');

const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
};

const selectTemplate = (templates, routeId, blockId) => {
    if (!templates || templates.length === 0) return "";
    const idx = hashString(routeId + blockId) % templates.length;
    return templates[idx];
};

const fillTemplate = (text, data) => {
    let res = text;
    res = res.replace(/\${to_accusative}/g, data.to_accusative);
    res = res.replace(/\${from_genitive}/g, data.from_genitive);
    res = res.replace(/\${from_ru}/g, data.from_ru);
    return res;
};

const generate = () => {
    if (!fs.existsSync(ROUTES_FILE)) {
        console.error("Routes file not found:", ROUTES_FILE);
        return;
    }

    const routesData = JSON.parse(fs.readFileSync(ROUTES_FILE, 'utf8'));
    const store = { routes: {} };

    routesData.routes.forEach(route => {
        const fromC = COUNTRIES[route.from];
        const toC = COUNTRIES[route.to];

        if (!fromC || !toC) {
            console.warn(`Skipping route ${route.route_id} due to missing country data.`);
            return;
        }

        const placeholders = {
            to_accusative: toC.to,
            from_genitive: fromC.from,
            from_ru: fromC.ru
        };

        const direction = route.direction; // 'export' or 'import'

        const blocks = {};

        // Define blocks to generate
        const blockKeys = ['hero', 'audience', 'customs', 'timelines', 'internal_links'];

        blockKeys.forEach(key => {
            let templates;
            if (key === 'internal_links') {
                templates = BLUEPRINTS[key] ? BLUEPRINTS[key].default : [];
            } else {
                templates = (BLUEPRINTS[key] && (BLUEPRINTS[key][direction] || BLUEPRINTS[key].default)) || [];
            }

            if (templates && templates.length > 0) {
                const raw = selectTemplate(templates, route.route_id, key);
                blocks[key] = { text: fillTemplate(raw, placeholders) };
            }
        });

        // SEO
        const seoTitle = direction === 'export'
            ? `Перевозки из Германии ${toC.to} (Экспорт)`
            : `Переезд из ${fromC.from} в Германию (Импорт)`;

        store.routes[route.route_id] = {
            ...route,
            blocks,
            seo: {
                title: seoTitle,
                description: `Услуги ${direction === 'export' ? 'экспорта' : 'импорта'}. Маршрут: ${fromC.ru} - ${toC.ru}.`,
            }
        };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(store, null, 2));
    console.log(`Generated pilot content for ${Object.keys(store.routes).length} routes.`);
};

generate();
