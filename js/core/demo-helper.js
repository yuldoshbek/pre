/**
 * LIVE DEMO ORCHESTRATOR
 * Overrides the simple control panel with a premium UI and activity logging.
 */

export function initDemoOrchestrator(params, citiesDB, renderCallback) {
    const orchestrator = document.createElement('div');
    orchestrator.className = 'demo-orchestrator';
    orchestrator.id = 'demo-orchestrator';

    let fromOptions = "";
    let toOptions = "";

    // Grouping for the select
    for (const group in citiesDB) {
        fromOptions += `<optgroup label="${group}">`;
        toOptions += `<optgroup label="${group}">`;
        for (const city in citiesDB[group]) {
            const data = citiesDB[group][city];
            const fromSelected = data.slug === params.from_city_slug ? 'selected' : '';
            const toSelected = data.slug === params.to_city_slug ? 'selected' : '';
            fromOptions += `<option value="${data.slug}" ${fromSelected}>${data.ru} (${city})</option>`;
            toOptions += `<option value="${data.slug}" ${toSelected}>${data.ru} (${city})</option>`;
        }
        fromOptions += `</optgroup>`;
        toOptions += `</optgroup>`;
    }

    orchestrator.innerHTML = `
        <button class="demo-toggle" onclick="this.parentElement.classList.toggle('minimized')">×</button>
        <h3><span class="pulse"></span> Content Pilot v1.0</h3>
        
        <div class="orchestrator-controls">
            <label>SOURCE (FROM)</label>
            <select id="demo-from-select">${fromOptions}</select>
            
            <label>DESTINATION (TO)</label>
            <select id="demo-to-select">${toOptions}</select>
            
            <label>LANGUAGE</label>
            <select id="demo-lang-select">
                <option value="ru" selected>Русский (RU)</option>
                <option value="en">English (EN)</option>
            </select>
        </div>

        <div class="demo-log" id="demo-log">
            <div class="log-entry sys">[System] Engine initialized.</div>
            <div class="log-entry sys">[System] Pilot Store: 278 routes.</div>
        </div>
    `;

    document.body.appendChild(orchestrator);

    // Event Listeners
    ['from', 'to', 'lang'].forEach(id => {
        document.getElementById(`demo-${id}-select`).addEventListener('change', (e) => {
            const val = e.target.value;
            renderCallback(id, val);
        });
    });
}

export function logToDemo(message, type = 'sys') {
    const logContainer = document.getElementById('demo-log');
    if (!logContainer) return;

    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const now = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    entry.innerHTML = `<span style="opacity: 0.5">[${now}]</span> ${message}`;

    logContainer.prepend(entry);
    if (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

export function highlightUpdate(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.classList.remove('updating-flash');
    void el.offsetWidth; // Trigger reflow
    el.classList.add('updating-flash');
}
