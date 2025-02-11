import { useState, useEffect, useCallback } from "react";

interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export const useTheme = (): Theme => {
  const [isDark, setIsDark] = useState(() => {
    // Vérifie d'abord le localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dim";
    }
    // Sinon utilise les préférences système
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Écoute les changements de préférences système
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Met à jour le thème dans le DOM et localStorage
    const theme = isDark ? "dim" : "corporate";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
};
