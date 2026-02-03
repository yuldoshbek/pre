const EUROPE_COUNTRIES = {
    "germany": { ru: "Германия", from: "Германии", to: "в Германию", en: "Germany", slug: "germany", is_eu: true },
    "france": { ru: "Франция", from: "Франции", to: "во Францию", en: "France", slug: "france", is_eu: true },
    "spain": { ru: "Испания", from: "Испании", to: "в Испанию", en: "Spain", slug: "spain", is_eu: true },
    "italy": { ru: "Италия", from: "Италии", to: "в Италию", en: "Italy", slug: "italy", is_eu: true },
    "portugal": { ru: "Португалия", from: "Португалии", to: "в Португалию", en: "Portugal", slug: "portugal", is_eu: true },
    "netherlands": { ru: "Нидерланды", from: "Нидерландов", to: "в Нидерланды", en: "Netherlands", slug: "netherlands", is_eu: true },
    "belgium": { ru: "Бельгия", from: "Бельгии", to: "в Бельгию", en: "Belgium", slug: "belgium", is_eu: true },
    "austria": { ru: "Австрия", from: "Австрии", to: "в Австрию", en: "Austria", slug: "austria", is_eu: true },
    "poland": { ru: "Польша", from: "Польши", to: "в Польшу", en: "Poland", slug: "poland", is_eu: true },
    "czech": { ru: "Чехия", from: "Чехии", to: "в Чехию", en: "Czech Republic", slug: "czech", is_eu: true },
    "hungary": { ru: "Венгрия", from: "Венгрии", to: "в Венгрию", en: "Hungary", slug: "hungary", is_eu: true },
    "slovakia": { ru: "Словакия", from: "Словакии", to: "в Словакию", en: "Slovakia", slug: "slovakia", is_eu: true },
    "slovenia": { ru: "Словения", from: "Словении", to: "в Словению", en: "Slovenia", slug: "slovenia", is_eu: true },
    "croatia": { ru: "Хорватия", from: "Хорватии", to: "в Хорватию", en: "Croatia", slug: "croatia", is_eu: true },
    "greece": { ru: "Греция", from: "Греции", to: "в Грецию", en: "Greece", slug: "greece", is_eu: true },
    "bulgaria": { ru: "Болгария", from: "Болгарии", to: "в Болгарию", en: "Bulgaria", slug: "bulgaria", is_eu: true },
    "romania": { ru: "Румыния", from: "Румынии", to: "в Румынию", en: "Romania", slug: "romania", is_eu: true },
    "sweden": { ru: "Швеция", from: "Швеции", to: "в Швецию", en: "Sweden", slug: "sweden", is_eu: true },
    "denmark": { ru: "Дания", from: "Дании", to: "в Данию", en: "Denmark", slug: "denmark", is_eu: true },
    "finland": { ru: "Финляндия", from: "Финляндии", to: "в Финляндию", en: "Finland", slug: "finland", is_eu: true },
    "estonia": { ru: "Эстония", from: "Эстонии", to: "в Эстонию", en: "Estonia", slug: "estonia", is_eu: true },
    "latvia": { ru: "Латвия", from: "Латвии", to: "в Латвию", en: "Latvia", slug: "latvia", is_eu: true },
    "lithuania": { ru: "Литва", from: "Литвы", to: "в Литву", en: "Lithuania", slug: "lithuania", is_eu: true },
    "ireland": { ru: "Ирландия", from: "Ирландии", to: "в Ирландию", en: "Ireland", slug: "ireland", is_eu: true },

    // Non-EU / Specific Requests
    "uk": { ru: "Англия", from: "Англии", to: "в Англию", en: "UK", slug: "uk", is_eu: false },
    "switzerland": { ru: "Швейцария", from: "Швейцарии", to: "в Швейцарию", en: "Switzerland", slug: "switzerland", is_eu: false },
    "serbia": { ru: "Сербия", from: "Сербии", to: "в Сербию", en: "Serbia", slug: "serbia", is_eu: false },
    "montenegro": { ru: "Черногория", from: "Черногории", to: "в Черногорию", en: "Montenegro", slug: "montenegro", is_eu: false },
    "albania": { ru: "Албания", from: "Албании", to: "в Албанию", en: "Albania", slug: "albania", is_eu: false },
    "macedonia": { ru: "Македония", from: "Македонии", to: "в Македонию", en: "Macedonia", slug: "macedonia", is_eu: false },
    "luxembourg": { ru: "Люксембург", from: "Люксембурга", to: "в Люксембург", en: "Luxembourg", slug: "luxembourg", is_eu: true },
    "monaco": { ru: "Монако", from: "Монако", to: "в Монако", en: "Monaco", slug: "monaco", is_eu: false },
    "liechtenstein": { ru: "Лихтенштейн", from: "Лихтенштейна", to: "в Лихтенштейн", en: "Liechtenstein", slug: "liechtenstein", is_eu: false },
    "norway": { ru: "Норвегия", from: "Норвегии", to: "в Норвегию", en: "Norway", slug: "norway", is_eu: false },
    "iceland": { ru: "Исландия", from: "Исландии", to: "в Исландию", en: "Iceland", slug: "iceland", is_eu: false },
    "malta": { ru: "Мальта", from: "Мальты", to: "на Мальту", en: "Malta", slug: "malta", is_eu: true },
    "cyprus": { ru: "Кипр", from: "Кипра", to: "на Кипр", en: "Cyprus", slug: "cyprus", is_eu: true },
    "andorra": { ru: "Андорра", from: "Андорры", to: "в Андорру", en: "Andorra", slug: "andorra", is_eu: false },
    "san_marino": { ru: "Сан-Марино", from: "Сан-Марино", to: "в Сан-Марино", en: "San Marino", slug: "san-marino", is_eu: false },
    "bosnia": { ru: "Босния и Герцеговина", from: "Боснии", to: "в Боснию", en: "Bosnia", slug: "bosnia", is_eu: false }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EUROPE_COUNTRIES;
} else {
    window.EUROPE_COUNTRIES = EUROPE_COUNTRIES;
}
