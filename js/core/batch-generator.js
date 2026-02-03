/**
 * BATCH CONTENT GENERATOR
 * Iterates through all city pairs (Germany <-> Russia) and triggers content generation.
 * Outputs the final JSON store to console for saving.
 */

import { CITIES_DATABASE } from '../data/cities.js';
import { getRouteContent, getStoreState } from './content-manager.js';
// We need to access the STORE from content-manager to dump it. 
// Since it's not exported, we will rely on getRouteContent populating it, 
// and then we might need a way to export it or just rely on the fact that we can't easily access the module-level variable from outside without an export.
// MODIFICATION: We will assume we can just run the generation and then... wait, we need to dump the store.
// Let's modify content-manager to export `getStoreState` for this purpose.

export async function runBatchGeneration() {
    console.log("🚀 STARTING BATCH GENERATION...");

    const germanyCities = Object.values(CITIES_DATABASE.Germany);
    const russiaCities = Object.values(CITIES_DATABASE.Russia);

    let count = 0;

    // 1. Germany -> Russia
    for (const deCity of germanyCities) {
        for (const ruCity of russiaCities) {
            await getRouteContent(deCity, ruCity, 'ru');
            count++;
        }
    }

    // 2. Russia -> Germany
    for (const ruCity of russiaCities) {
        for (const deCity of germanyCities) {
            await getRouteContent(ruCity, deCity, 'ru');
            count++;
        }
    }

    console.log(`✅ GENERATION COMPLETE. Processed ${count} routes.`);
    console.log("👇 COPY THE JSON BELOW THIS LINE 👇");
    console.log(JSON.stringify(getStoreState(), null, 4));
}
