type NavLink = {
  path: string;
  label: string;
  icon?: string;
};

export const NAV_LINKS_MAIN: Record<string, NavLink> = {
  home: { path: "/", label: "Home", icon: "HomeIcon" },
  movies: { path: "/movies", label: "Movies", icon: "FilmIcon" },
  shows: { path: "/shows", label: "Shows", icon: "TvIcon" },
  aiMode: { path: "/ai-mode", label: "AI Mode", icon: "SparklesIcon" },
  about: { path: "/about-us", label: "About Us" },
} as const;

export const NAV_LINKS_SECONDARY: Record<string, NavLink> = {
  appInfo: { path: "/app-info", label: "App Info" },
  contactUs: { path: "/contact-us", label: "Contact Us" },
  terms: { path: "/terms", label: "Terms Of Use" },
  privacy: { path: "/privacy", label: "Privacy Policy" },
  siteMap: { path: "/site-map", label: "Site Map" },
} as const;
