export const NAV_LINKS_MAIN = [
  { path: "/", label: "Home", icon: "HomeIcon" },
  { path: "/movies", label: "Movies", icon: "FilmIcon" },
  { path: "/shows", label: "Shows", icon: "TvIcon" },
  { path: "/ai-mode", label: "AI Mode", icon: "SparklesIcon" },
  { path: "/about-us", label: "About Us", icon: "SparklesIcon" },
] as const;

export const NAV_LINKS_SECONDARY = [
  { path: "/app-info", label: "App Info" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/terms", label: "Terms Of Use" },
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/site-map", label: "Site Map" },
] as const;
