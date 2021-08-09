const suffix = {
  he: "תערוכת בוגרים.ות 2021 — המחלקה לתקשורת חזותית — מכון טכנולוגי חולון",
};

const he = {
  suffix: suffix.he,
  floor: "קומה",
  room: "חדר",
  faculty: "הפקולטה לעיצוב",
  exhibitionName: "וריאנטים",
  exhibitionDescription: "תערוכת בוגרים.ות",
  navTitle: "המחלקה לתקשורת חזותית",
  navSubtitle: "בוגרים.ות 2021",
  hit: "HIT – מכון טכנולוגי חולון",
  instagram: "אינסטגרם",
  mail: "מייל",
  portfolio: "פורטפוליו",
  "404": "העמוד לא נמצא.",
  "500": "תקלה בשרת.",
  // routes
  home: "בית",
  gallery: "גלריה",
  index: "חיפוש",
  searchLabel: "חיפוש",
  searchPlaceholder: "חיפוש לפי שם פרויקט או סטודנט.ית",
  heads: {
    home: {
      title: `בית | ${suffix.he}`,
      description:
        ".אתר תערוכת הבוגרים.ות 2021 של המחלקה לתקשורת חזותית במכון הטכנולוגי חולון",
    },
    search: {
      title: `חיפוש | ${suffix.he}`,
      description: "חפש בתערוכה לפי שם הפרויקט או הסטודנט.ית.",
    },
    "404": {
      title: `404 | ${suffix.he}`,
      description: "העמוד לא נמצא.",
    },
    "500": {
      title: `500 | ${suffix.he}`,
      description: "תקלת שרת.",
    },
  },
};

const en = { ...he };

const strings = {
  he,
  en,
};

export default strings;
