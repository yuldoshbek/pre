/**
 * CONTENT MANAGER
 * Orchestrates the content pipeline:
 * 1. Check Store (JSON)
 * 2. If missing -> Call AI Agent (Generate)
 * 3. Save to Store (Persist)
 * 4. Return Content
 */

import { generateContentForBlock } from './ai-agent.js';
// In a real app, we would import the JSON. Here we simulate reading/writing to the store object.
// We load the initial store from the file we just created.
import contentStoreData from '../data/content-store-pilot.json' with { type: "json" };

// In-memory store (simulating DB connection)
const STORE = contentStoreData;

export async function getRouteContent(fromCity, toCity, language) {
    // ✨ PILOT LOGIC: Handle direction based IDs
    let routeId = `${fromCity.slug}-${toCity.slug}`;

    if (fromCity.slug === 'germany') {
        routeId = `germany-${toCity.slug}-export`;
    } else if (toCity.slug === 'germany') {
        routeId = `${fromCity.slug}-germany-import`;
    }

    // 1. Check Store
    if (STORE.routes[routeId]) {
        console.log(`[ContentManager] Found cached content for ${routeId}`);
        return STORE.routes[routeId];
    }

    // 2. Generate New Content (if not found)
    console.log(`[ContentManager] Generating NEW content for ${routeId}...`);

    const routeData = {
        route_id: routeId,
        from: fromCity.ru,
        to: toCity.ru,
        // ✨ Grammar Fix: Pass declined forms
        from_genitive: fromCity.from, // "Берлина"
        to_accusative: toCity.to,   // "в Берлин"
        language: language,
        blocks: {},
        seo: {}
    };

    // Generate Blocks based on Blueprints
    // We iterate through known content blocks
    const contentBlocks = ['hero', 'audience', 'cargo', 'process', 'packing', 'transport', 'customs'];
    for (const blockId of contentBlocks) {
        routeData.blocks[blockId] = await generateContentForBlock(blockId, routeData);
    }

    // Generate SEO
    routeData.seo = {
        title: await generateContentForBlock('seo_title', routeData),
        description: await generateContentForBlock('seo_desc', routeData),
        schema_desc: await generateContentForBlock('schema_desc', routeData)
    };

    // 3. Save to Store (Persist)
    // In a browser environment, we can't write to disk permanently without a server API.
    // We will save to our in-memory STORE.
    STORE.routes[routeId] = routeData;

    // Log the "Write" action (Simulating DB INSERT)
    console.log(`[ContentManager] Saved new route ${routeId} to Store.`);

    return routeData;
}

/**
 * Debug/Batch Helper: Get full store state
 */
export function getStoreState() {
    return STORE;
}
