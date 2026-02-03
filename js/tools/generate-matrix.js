const fs = require('fs');
const path = require('path');
const COUNTRIES = require('../data/countries-europe.js');

const TARGET_ROUTES = 100;
const OUTPUT_FILE = path.join(__dirname, '../data/routes-pilot.json');

const routes = [];
const countryKeys = Object.keys(COUNTRIES).filter(k => k !== 'germany');

// 1. Export: Germany -> X
countryKeys.forEach(slug => {
    routes.push({
        route_id: `germany-${slug}-export`,
        from: 'germany',
        to: slug,
        direction: 'export'
    });
});

// 2. Import: X -> Germany
countryKeys.forEach(slug => {
    routes.push({
        route_id: `${slug}-germany-import`,
        from: slug,
        to: 'germany',
        direction: 'import'
    });
});

const data = {
    routes: routes
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`Generated ${routes.length} routes in ${OUTPUT_FILE}`);
