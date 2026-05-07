import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Persist across page reloads
    try { return localStorage.getItem("sl-theme") || "light"; } catch { return "light"; }
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("sl-theme", theme); } catch { /* quota exceeded — graceful fallback */ }

    if (theme === "dark") {
      root.style.setProperty("--bg-color", "#000000");
      root.style.setProperty("--text-color", "#ffffff");
      root.classList.add("dark");
    } else {
      root.style.setProperty("--bg-color", "#f8f9fa");
      root.style.setProperty("--text-color", "#000000");
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
