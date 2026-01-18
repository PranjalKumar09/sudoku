import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Load theme from localStorage
        const saved = localStorage.getItem("sudoku-theme");
        return saved || "light";
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        // Save to localStorage
        localStorage.setItem("sudoku-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
