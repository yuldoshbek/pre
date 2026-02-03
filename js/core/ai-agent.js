/**
 * AI AGENT SIMULATOR
 * Simulates the generation of unique content based on Meaning Blueprints.
 * In a real production environment, this would call OpenAI API.
 */

import { BLUEPRINTS } from '../data/blueprints.js';

export async function generateContentForBlock(blockId, routeData) {
    const blueprint = BLUEPRINTS[blockId];
    if (!blueprint) return null;

    // Simulate AI processing time
    await new Promise(r => setTimeout(r, 100));

    // 3. AI AGENT SIMULATION (Deterministic & Unique)
    const r = routeData;

    // ✨ DETERMINISTIC SELECTION: One Route = Always Same Content
    // We use a simple hash of the route_id + block_id to select the template.
    const seed = r.route_id + blockId;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    const select = (arr) => arr[Math.abs(hash) % arr.length];

    // --- CONTENT BLOCKS ---
    if (blockId === 'customs') {
        const t = [
            `Мы берем на себя оформление экспорта из ${r.from_genitive} и импортных процедур ${r.to_accusative}. Готовим полный пакет (T1, EX-1).`,
            `Полное таможенное сопровождение маршрута ${r.from} — ${r.to}. Оформляем экспортные декларации и обеспечиваем чистый импорт.`,
            `Переезд из ${r.from_genitive} ${r.to_accusative} требует точных документов. Мы готовим всё: от экспортной EX-1 до финальной очистки.`
        ];
        return { text: select(t), tags: ["EXPORT-DOCS", "CUSTOMS"] };
    }

    if (blockId === 'hero') {
        const t = [
            `Профессиональный переезд из ${r.from_genitive} ${r.to_accusative} с полным таможенным оформлением.`,
            `Ваш личный груз из ${r.from_genitive} будет доставлен ${r.to_accusative} быстро и безопасно.`,
            `Комплексная релокация ${r.from} — ${r.to}: упаковка, таможня, доставка до двери.`
        ];
        return { subtitle: select(t) };
    }

    if (blockId === 'audience') {
        const t = [
            "Мы работаем как с частными лицами, перевозящими квартиру, так и с компаниями, релоцирующими офисы.",
            "Помогаем семьям перевезти домашний уют, а бизнесу — оборудование и рабочие места.",
            "Наши клиенты — это экспаты, дипломаты и международные компании, ценящие надежность."
        ];
        return { text: select(t) };
    }

    if (blockId === 'cargo') {
        const t = [
            "Принимаем к перевозке мебель, бытовую технику, личные вещи, книги и даже хрупкие предметы искусства.",
            "Перевезем всё: от коробок с одеждой до крупногабаритной мебели и музыкальных инструментов.",
            "Бережно доставим ваши личные вещи, технику и мебель. Гарантируем сохранность каждого предмета."
        ];
        return { text: select(t) };
    }

    if (blockId === 'process') {
        const t = [
            "Весь процесс прозрачен: от бесплатной оценки и упаковки до таможенной очистки и разгрузки в новом доме.",
            "Мы спланировали всё: оценка -> упаковка -> дорога -> таможня -> ваш новый адрес.",
            "Работаем по отлаженной схеме: договор, профессиональная упаковка, логистика и таможня без вашего участия."
        ];
        return { text: select(t) };
    }

    if (blockId === 'packing') {
        const t = [
            "Используем 5 видов упаковки: пузырчатая пленка, усиленные коробки, уголки и обрешетку для хрупкого.",
            "Профессиональная упаковка — залог безопасности. Каждую чашку и диван мы упакуем по международным стандартам.",
            "Вам не нужно искать коробки. Мы привезем свои материалы и упакуем вещи так, чтобы они пережили любой путь."
        ];
        return { text: select(t) };
    }

    if (blockId === 'transport') {
        const t = [
            "Используем современные еврофуры для доставки по Европе. Возможна отправка в составе сборного груза.",
            "Собственный автопарк и проверенные партнеры. Оптимальные маршруты для сокращения времени в пути.",
            "Автомобильные перевозки — самый надежный способ доставки между Германией и Россией сегодня."
        ];
        return { text: select(t) };
    }

    // --- SEO BLOCKS ---
    if (blockId === 'seo_title') {
        const t = [
            `Переезд из ${r.from_genitive} ${r.to_accusative} под ключ | Intercargo`,
            `Перевозка вещей ${r.from} - ${r.to} с таможней`,
            `Международный переезд: ${r.from} → ${r.to} | Услуги`
        ];
        return select(t);
    }

    if (blockId === 'seo_desc') {
        const t = [
            `Организуем переезд из ${r.from_genitive} ${r.to_accusative}. Таможенное оформление, упаковка, доставка от двери до двери. Рассчитайте стоимость!`,
            `Перевозка личных вещей из ${r.from_genitive} ${r.to_accusative} без стресса. Полный пакет документов, страховка и грузчики.`,
            `Услуги релокации из ${r.from_genitive} ${r.to_accusative}. Профессиональная помощь с вывозом и ввозом вещей. Оставьте заявку.`
        ];
        return select(t);
    }

    if (blockId === 'schema_desc') {
        return `Комплексные услуги по международному переезду по маршруту ${r.from} - ${r.to}.`;
    }

    return null;
}
