import React, { useState } from "react";

const Icons = {
  Manicure: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5l4 4" />
      <path d="M13 7l-4.3-4.3a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
      <path d="M8 6l5 5" />
      <path d="M14 12l7.3 7.3a2.41 2.41 0 0 1 0 3.4l-.6.6a2.41 2.41 0 0 1-3.4 0L10 16" />
    </svg>
  ),
  Pedicure: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Scissors: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  Palette: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.67-.75 1.67-1.67 0-.42-.16-.8-.43-1.09-.27-.29-.43-.68-.43-1.09 0-.92.75-1.67 1.67-1.67H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z" />
    </svg>
  ),
  Botox: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 0 1 0-1.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
    </svg>
  ),
  Massage: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 0 1 2 2v4a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.83L7 15" />
    </svg>
  ),
  Eyelashes: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  )
};

interface CategoryFiltersProps {
  lang?: "ua" | "en";
}

export default function CategoryFilters({ lang = "ua" }: CategoryFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("manicure");
  const [isExpanded, setIsExpanded] = useState(false);

  const isEn = lang === "en";

  const mainCategories = [
    { id: "manicure", label: isEn ? "Manicure" : "Манікюр", icon: Icons.Manicure },
    { id: "pedicure", label: isEn ? "Pedicure" : "Педикюр", icon: Icons.Pedicure },
    { id: "haircut", label: isEn ? "Haircut" : "Стрижка", icon: Icons.Scissors },
    { id: "coloring", label: isEn ? "Coloring" : "Фарбування", icon: Icons.Palette },
    { id: "botox", label: isEn ? "Botox" : "Ботокс", icon: Icons.Botox },
    { id: "massage", label: isEn ? "Massage" : "Масаж", icon: Icons.Massage },
    { id: "eyelashes", label: isEn ? "Eyelashes" : "Нарощування вій", icon: Icons.Eyelashes },
  ];

  const extraCategories = [
    { id: "brows", label: isEn ? "Brows & Lashes" : "Брови та вії", icon: Icons.Sparkles },
    { id: "makeup", label: isEn ? "Makeup" : "Макіяж", icon: Icons.Sparkles },
    { id: "cosmetology", label: isEn ? "Cosmetology" : "Косметологія", icon: Icons.Sparkles },
    { id: "depilation", label: isEn ? "Depilation" : "Депіляція", icon: Icons.Sparkles },
    { id: "solarium", label: isEn ? "Solarium" : "Солярій", icon: Icons.Sparkles },
    { id: "facial", label: isEn ? "Facial" : "Чистка обличчя", icon: Icons.Sparkles },
    { id: "spa", label: "SPA", icon: Icons.Sparkles },
  ];

  return (
    <div className="categories-container">
      {/* Рядок 1: Основні категорії + кнопка "Ще" */}
      <div className="categories-row">
        {mainCategories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="chip-icon"><IconComponent /></span>
              <span>{cat.label}</span>
            </button>
          );
        })}

        <button
          className={`category-chip more-btn ${isExpanded ? "open" : ""} ${
            extraCategories.some((c) => c.id === activeCategory) ? "active" : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={`chevron-icon ${isExpanded ? "rotated" : ""}`}>
            <Icons.ChevronDown />
          </span>
          <span>{isExpanded ? (isEn ? "Less" : "Згорнути") : (isEn ? "More" : "Ще")}</span>
        </button>
      </div>

      {/* Рядок 2: Додаткові категорії */}
      {isExpanded && (
        <div className="categories-row extra-row">
          {extraCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="chip-icon"><IconComponent /></span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}