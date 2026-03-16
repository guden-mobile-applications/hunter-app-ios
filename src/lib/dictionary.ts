export type Locale = "en" | "tr";

export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: {
    navigation: {
      home: "Home",
      back: "Back to Documents",
    },
    home: {
      title: "Hunter App Documents",
      description:
        "Welcome to the official legal and support documentation for Hunter App. Please review the terms of use, privacy policies, and other important documents below.",
      readDocument: "Read Document",
    },
    footer: {
      rights: "Hunter App. All rights reserved.",
    },
    language: {
      english: "English",
      turkish: "Türkçe",
      switch: "Language",
    },
  },
  tr: {
    navigation: {
      home: "Ana Sayfa",
      back: "Belgelere Dön",
    },
    home: {
      title: "Hunter App Belgeleri",
      description:
        "Hunter App resmi yasal ve destek belgelerine hoş geldiniz. Lütfen aşağıdaki kullanım koşullarını, gizlilik politikalarını ve diğer önemli belgeleri inceleyin.",
      readDocument: "Belgeyi Oku",
    },
    footer: {
      rights: "Hunter App. Tüm hakları saklıdır.",
    },
    language: {
      english: "English",
      turkish: "Türkçe",
      switch: "Dil",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
