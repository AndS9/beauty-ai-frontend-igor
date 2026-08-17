import React, { useState } from "react";
import "./App.css";
import MapSection from "./MapSection";
import CategoryFilters from "./CategoryFilters";
import FilterBar from './FilterBar';
import heroImage from "./assets/hero.png";

type CardData = {
  image: string;
  badges: { text: string; kind: string }[];
  title: string;
  type: string;
  rating: number;
  reviews: number;
  district: string;
  distance: string;
  openNow?: boolean;
  tags: string[];
  priceFrom: string;
  mastersCount?: string;
  avgCheck?: string;
  why?: string;
};

type Lang = "ua" | "en";

const dict = {
  ua: {
    nav: ["Майстри", "Салони", "Послуги", "Блог"],
    loginGoogle: "Увійти",
    heroTitle1: "Знайдіть свого майстра",
    heroTitle2: "за допомогою ",
    heroSubtitle: "Опишіть, що вам потрібно — ми підберемо найкращі варіанти поруч",
    searchPlaceholder: "Наприклад: манікюр у центрі Києва сьогодні",
    searchBtn: "Знайти",
    filters: "Фільтри",
    partnersLink: "Детальніше про партнерів",
    footer: "Beauty AI аналізує ваші запити та обирає найкращі варіанти саме для вас",
    sections: {
      recommendations: { title: "Рекомендації Beauty AI", subtitle: "Найкраще відповідають вашому запиту" },
      partners: { title: "Пропозиції від партнерів", subtitle: "Ексклюзивні знижки та акції" },
      nearby: { title: "Популярне поруч", subtitle: "Те, що зараз обирають неподалік" },
      topRated: { title: "Високі рейтинги", subtitle: "Майстри та салони з найкращими відгуками" },
      fresh: { title: "Новинки на платформі", subtitle: "Нові майстри та салони для вас" },
    },
    cta: "Записатися",
    viewSalon: "Дивитися салон",
    inSalon: "у салоні",
    avgCheck: "Середній чек",
  },
  en: {
    nav: ["Masters", "Salons", "Services", "Blog"],
    loginGoogle: "Sign in",
    heroTitle1: "Find your master",
    heroTitle2: "with the help of  ",
    heroSubtitle: "Describe what you need — we'll find the best options nearby",
    searchPlaceholder: "E.g.: manicure in central Kyiv today",
    searchBtn: "Search",
    filters: "Filters",
    partnersLink: "More about partners",
    footer: "Beauty AI analyzes your requests and picks the best options just for you",
    sections: {
      recommendations: { title: "Beauty AI Recommendations", subtitle: "Best match for your request" },
      partners: { title: "Partner Offers", subtitle: "Exclusive discounts and promotions" },
      nearby: { title: "Popular Nearby", subtitle: "What people are choosing nearby right now" },
      topRated: { title: "Top Rated", subtitle: "Masters and salons with the best reviews" },
      fresh: { title: "New on the Platform", subtitle: "New masters and salons for you" },
    },
    cta: "Book now",
    viewSalon: "View salon",
    inSalon: "at the salon",
    avgCheck: "Average check",
  },
} as const;

type Translations = (typeof dict)[Lang];

function FavButton() {
  const [active, setActive] = useState(false);
  return (
    <button
      className={`fav-btn ${active ? "active" : ""}`}
      aria-label="Додати в обране"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setActive((prev) => !prev);
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

function Card({ data, t }: { data: CardData; t: Translations }) {
  return (
    <div className="card">
      <div
        className="card-image"
        style={{ ['--card-photo' as string]: `url(${data.image})` }}
      >
        <div className="card-badges">
          {data.badges.map((b) => (
            <span key={b.text} className={`badge ${b.kind}`}>
              {b.text}
            </span>
          ))}
        </div>
        <FavButton />
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <div>
            <h3>{data.title}</h3>
            <p className="card-type">{data.type}</p>
          </div>
          <div className="card-rating">
            <span className="star">★</span> {data.rating.toFixed(1)}{" "}
            <span className="count">({data.reviews})</span>
          </div>
        </div>

        <div className="card-meta">
          <span className="district-pin">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#a855f7" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {data.district}
          </span>
          <span>· {data.distance}</span>
          {data.openNow && <span className="open-now">· Відкрито зараз</span>}
        </div>

        <div className="card-tags">
          {data.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <div className="price-block">
            <div className="price">від {data.priceFrom} грн</div>
            <div className="avg">{data.avgCheck ?? t.avgCheck}</div>
          </div>
          <div className="masters-block">
            {data.mastersCount && <div>🕐 {data.mastersCount}</div>}
            <div>{t.inSalon}</div>
          </div>
        </div>

        <div className="card-cta-row">
          <button className="cta-btn">{t.cta}</button>
          <a className="view-link" href="#">
            {t.viewSalon} →
          </a>
        </div>

        {data.why && (
          <div className="why-box">
            <div className="why-title">✦ Чому рекомендуємо?</div>
            <p>{data.why}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <p className="section-divider">✦</p>;
}

const recommendations: CardData[] = [
  {
    image: "https://images.pexels.com/photos/7755296/pexels-photo-7755296.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "AI MATCH 98%", kind: "ai-match" }],
    title: "Luna Beauty House",
    type: "Салон краси",
    rating: 4.9,
    reviews: 124,
    district: "Печерський р-н",
    distance: "0.4 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Гель-лак", "Дизайн нігтів"],
    priceFrom: "600",
    mastersCount: "7 майстрів",
    why: "Високий рейтинг, спеціалізація на манікюрі, зручна локація та вільні вікна сьогодні",
  },
  {
    image: "https://images.pexels.com/photos/19695969/pexels-photo-19695969.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "AI MATCH 94%", kind: "ai-match" }],
    title: "Nails Studio",
    type: "Салон краси",
    rating: 4.8,
    reviews: 98,
    district: "Печерський р-н",
    distance: "0.6 км",
    openNow: true,
    tags: ["Манікюр", "Нарощування", "Дизайн", "SPA"],
    priceFrom: "550",
    mastersCount: "5 майстрів",
    why: "Чудові відгуки та оптимальне співвідношення ціна-якість для вашого запиту",
  },
  {
    image: "https://images.pexels.com/photos/7447125/pexels-photo-7447125.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [
      { text: "AI MATCH 93%", kind: "ai-match" },
      { text: "НОВИНКА", kind: "new" },
    ],
    title: "Beauty Room",
    type: "Салон краси",
    rating: 4.7,
    reviews: 76,
    district: "Печерський р-н",
    distance: "0.8 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Нарощування вій", "Брови"],
    priceFrom: "650",
    mastersCount: "5 майстрів",
    why: "Підходить вашому бюджету та має багато позитивних відгуків",
  },
];

const partners: CardData[] = [
  {
    image: "https://images.pexels.com/photos/7755238/pexels-photo-7755238.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "-20%", kind: "discount" }],
    title: "Mon Chéri Salon",
    type: "Салон краси",
    rating: 4.8,
    reviews: 112,
    district: "Золоті ворота",
    distance: "1.1 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Масаж", "Косметологія"],
    priceFrom: "700",
    mastersCount: "8 майстрів",
  },
  {
    image: "https://images.pexels.com/photos/3993323/pexels-photo-3993323.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "-30%", kind: "discount" }],
    title: "Queen Studio",
    type: "Студія краси",
    rating: 4.7,
    reviews: 85,
    district: "Липки",
    distance: "1.3 км",
    openNow: true,
    tags: ["Стрижка", "Фарбування", "Ботокс", "Догляд"],
    priceFrom: "600",
    mastersCount: "6 майстрів",
  },
  {
    image: "https://images.pexels.com/photos/19695972/pexels-photo-19695972.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "ПОДАРУНОК", kind: "gift" }],
    title: "Shine Beauty",
    type: "Салон краси",
    rating: 4.8,
    reviews: 64,
    district: "Арсенальна",
    distance: "1.4 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Масаж", "Брови"],
    priceFrom: "550",
    mastersCount: "5 майстрів",
  },
];

const nearby: CardData[] = [
  {
    image: "https://images.pexels.com/photos/7755219/pexels-photo-7755219.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "ВІДКРИТО ЗАРАЗ", kind: "open" }],
    title: "Beauty Point",
    type: "Салон краси",
    rating: 4.6,
    reviews: 53,
    district: "Печерський р-н",
    distance: "0.3 км",
    openNow: true,
    tags: ["Манікюр", "Гель-лак", "Дизайн нігтів", "Парафінотерапія"],
    priceFrom: "500",
    mastersCount: "4 майстри",
  },
  {
    image: "https://images.pexels.com/photos/7755245/pexels-photo-7755245.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "ТРЕНДОВЕ МІСЦЕ", kind: "trend" }],
    title: "Pink Nail Bar",
    type: "Нейл-бар",
    rating: 4.5,
    reviews: 41,
    district: "Печерський р-н",
    distance: "0.7 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Нарощування", "Дизайн"],
    priceFrom: "450",
    mastersCount: "3 майстри",
  },
  {
    image: "https://images.pexels.com/photos/7755173/pexels-photo-7755173.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "БЛИЗЬКО ДО МЕТРО", kind: "metro" }],
    title: "Metro Beauty",
    type: "Салон краси",
    rating: 4.8,
    reviews: 68,
    district: "Кловська",
    distance: "0.5 км",
    openNow: true,
    tags: ["Стрижка", "Укладка", "Фарбування", "Догляд"],
    priceFrom: "600",
    mastersCount: "5 майстрів",
  },
];

const topRated: CardData[] = [
  {
    image: "https://images.pexels.com/photos/7755218/pexels-photo-7755218.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "ТОП РЕЙТИНГ", kind: "top-rating" }],
    title: "Elegant Beauty",
    type: "Салон краси",
    rating: 4.9,
    reviews: 156,
    district: "Печерський",
    distance: "1.2 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Масаж", "Косметологія"],
    priceFrom: "800",
    mastersCount: "10 майстрів",
  },
  {
    image: "https://images.pexels.com/photos/7755224/pexels-photo-7755224.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "ВИБІР КЛІЄНТІВ", kind: "client-choice" }],
    title: "Perfect Look",
    type: "Нейл-бар",
    rating: 4.8,
    reviews: 97,
    district: "Печерський р-н",
    distance: "0.9 км",
    openNow: true,
    tags: ["Стрижка", "Фарбування", "Ботокс", "Догляд"],
    priceFrom: "450",
    mastersCount: "3 майстри",
  },
  {
    image: "https://images.pexels.com/photos/7755247/pexels-photo-7755247.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "НАЙКРАЩІ ВІДГУКИ", kind: "best-reviews" }],
    title: "VIP Beauty Club",
    type: "Салон краси",
    rating: 4.8,
    reviews: 89,
    district: "Арсенальна",
    distance: "1.5 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Масаж", "Косметологія"],
    priceFrom: "900",
    mastersCount: "7 майстрів",
  },
];

const fresh: CardData[] = [
  {
    image: "https://images.pexels.com/photos/7990108/pexels-photo-7990108.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "НОВИЙ САЛОН", kind: "new-salon" }],
    title: "Fresh Beauty",
    type: "Салон краси",
    rating: 4.6,
    reviews: 22,
    district: "Печерський р-н",
    distance: "0.6 км",
    openNow: true,
    tags: ["Манікюр", "Педикюр", "Дизайн", "Нарощування"],
    priceFrom: "500",
    mastersCount: "4 майстри",
  },
  {
    image: "https://images.pexels.com/photos/7755296/pexels-photo-7755296.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "НОВИЙ МАЙСТЕР", kind: "new-master" }],
    title: "Kate Nails",
    type: "Майстер манікюру",
    rating: 4.7,
    reviews: 18,
    district: "Липки",
    distance: "1.0 км",
    openNow: true,
    tags: ["Манікюр", "Гель-лак", "Дизайн нігтів"],
    priceFrom: "400",
    mastersCount: "1 майстер",
  },
  {
    image: "https://images.pexels.com/photos/7755665/pexels-photo-7755665.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    badges: [{ text: "НОВА ПОСЛУГА", kind: "new-service" }],
    title: "VIP Beauty Club",
    type: "Салон краси",
    rating: 4.8,
    reviews: 89,
    district: "Арсенальна",
    distance: "1.5 км",
    openNow: true,
    tags: ["Ботокс для волосся", "Ламінування"],
    priceFrom: "700",
    mastersCount: "3 майстри",
  },
];

function Section({
  title,
  subtitle,
  icon,
  link,
  cards,
  t,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode; /* Дозволяє передавати як SVG, так і звичайні строки/емодзі */
  link?: string;
  cards: CardData[];
  t: Translations;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2 className="section-title">
            <span className="accent">{icon}</span> {title}
          </h2>
          <p className="section-sub">{subtitle}</p>
        </div>
        {link && (
          <a className="section-link" href="#">
            {link} ›
          </a>
        )}
      </div>
      <div className="cards-grid">
        {cards.map((c, i) => (
          <Card key={c.title + i} data={c} t={t} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("ua");
  const t = dict[lang];

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="spark">✦</span> Beauty AI
        </div>
        <nav className="nav">
          {t.nav.map((label) => (
            <a key={label} href="#">
              {label}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <button
            className="lang-select"
            onClick={() => setLang(lang === "ua" ? "en" : "ua")}
            aria-label="Switch language"
          >
            {lang === "ua" ? "UA" : "EN"} ˅
          </button>
          
          <button className="google-login-btn">
            {t.loginGoogle}
          </button>
        </div>
      </header>

      <section className="hero-full-width">
        <div className="hero-overlay-content">
          <div className="hero-content">
            <h1>
              {t.heroTitle1} <br />
              {t.heroTitle2} <span className="accent">AI ✦</span>
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>

            <div className="search-bar">
              <input type="text" placeholder={t.searchPlaceholder} />
              <button className="search-btn">{t.searchBtn} +</button>
            </div>
          </div>
        </div>
      </section>

      <CategoryFilters lang={lang} />

      <MapSection lang={lang} />

      <SectionDivider />
      
      <section className="section">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 className="section-title">
              <span className="accent">✦</span> {t.sections.recommendations.title}
            </h2>
            <p className="section-sub">{t.sections.recommendations.subtitle}</p>
          </div>
          
          {/* Передаємо поточну мову lang у FilterBar */}
          <FilterBar 
            lang={lang}
            onFilterChange={(filters: any) => console.log(filters)} 
          />
        </div>
        
        <div className="cards-grid">
          {recommendations.map((c, i) => (
            <Card key={c.title + i} data={c} t={t} />
          ))}
        </div>
      </section>

      <SectionDivider />
      <Section
        title={t.sections.partners.title}
        subtitle={t.sections.partners.subtitle}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12l4 6-10 12L2 9z" />
            <path d="M11 3 8 9l4 12 4-12-3-6" />
            <path d="M2 9h20" />
          </svg>
        }
        link={t.partnersLink}
        cards={partners}
        t={t}
      />

      <SectionDivider />
      <Section
        title={t.sections.nearby.title}
        subtitle={t.sections.nearby.subtitle}
        icon={
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#a855f7" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        }
        cards={nearby}
        t={t}
      />

      <SectionDivider />
      <Section
        title={t.sections.topRated.title}
        subtitle={t.sections.topRated.subtitle}
        icon="★"
        cards={topRated}
        t={t}
      />

      <SectionDivider />
      <Section
        title={t.sections.fresh.title}
        subtitle={t.sections.fresh.subtitle}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r="1.5" fill="#a855f7" stroke="none" />
          </svg>
        }
        cards={fresh}
        t={t}
      />

      <p className="footer-note">ⓘ {t.footer} ✦</p>
    </div>
  );
}