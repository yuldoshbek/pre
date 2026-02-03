/**
 * MEANING BLUEPRINTS
 * Defines the core meaning that must be conveyed in every block.
 * The AI uses this as instructions to generate unique wording.
 */

export const BLUEPRINTS = {
    export const BLUEPRINTS = {
        // --- CONTENT BLOCKS ---
        hero: {
            id: "hero",
            core_meaning: [
                "Полный комплекс услуг по переезду из {cityFrom} в {cityTo}",
                "Включает упаковку, таможню и доставку до двери",
                "Указание на профессионализм и надежность"
            ],
            required_keywords: ["переезд", "под ключ", "доставка"]
        },
        audience: {
            id: "audience",
            core_meaning: [
                "Работаем с частными лицами (релокация семьи)",
                "Работаем с корпоративными клиентами (переезд офиса)",
                "Индивидуальный подход к каждому клиенту"
            ],
            required_keywords: ["частные клиенты", "бизнес", "релокация"]
        },
        cargo: {
            id: "cargo",
            core_meaning: [
                "Перевозим мебель, технику, личные вещи",
                "Бережно относимся к хрупким предметам",
                "Возможность перевозки негабаритных грузов"
            ],
            required_keywords: ["мебель", "личные вещи", "техника"]
        },
        process: {
            id: "process",
            core_meaning: [
                "Этап 1: Оценка и договор",
                "Этап 2: Упаковка и забор груза",
                "Этап 3: Таможенное оформление",
                "Этап 4: Доставка и разгрузка"
            ],
            required_keywords: ["этапы", "договор", "упаковка", "таможня"]
        },
        packing: {
            id: "packing",
            core_meaning: [
                "Используем профессиональные упаковочные материалы",
                "Многослойная защита для хрупких вещей",
                "Маркировка каждой коробки"
            ],
            required_keywords: ["упаковка", "защита", "коробки"]
        },
        transport: {
            id: "transport",
            core_meaning: [
                "Автомобильные перевозки (оптимально для Европы)",
                "Консолидация грузов (экономия)",
                "Выделенный транспорт (скорость)"
            ],
            required_keywords: ["автотранспорт", "сборный груз", "фура"]
        },
        customs: {
            id: "customs",
            core_meaning: [
                "Оформление экспорта из страны отправления ({cityFrom})",
                "Оформление импорта в страну назначения ({cityTo})",
                "Подготовка пакета документов (T1, EX-1, опись)",
                "Соблюдение таможенных правил обеих стран"
            ],
            required_keywords: ["экспорт", "импорт", "документы", "таможня"]
        },

        // --- SEO BLOCKS ---
        seo_title: {
            id: "seo_title",
            core_meaning: ["Переезд {cityFrom} — {cityTo} под ключ | Intercargo"],
            length: "Max 60 chars"
        },
        seo_desc: {
            id: "seo_desc",
            core_meaning: [
                "Международная перевозка личных вещей из {cityFrom} в {cityTo}.",
                "Таможенное оформление, упаковка, страховка.",
                "Рассчитайте стоимость онлайн."
            ],
            length: "Max 160 chars"
        },
        schema_desc: {
            id: "schema_desc",
            core_meaning: ["Услуги международного переезда и перевозки вещей по маршруту {cityFrom} - {cityTo}."]
        }
    };
};
