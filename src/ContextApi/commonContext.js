import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export const commonContext = createContext();

export const CommonProvider = ({ children }) => {
    const systemTheme = useColorScheme(); // 'light' or 'dark'
    const [theme, setTheme] = useState(systemTheme || 'light');
    const [courses, setCourses] = useState();
    const [isLoggedIn, setisLoggedIn] = useState(false)

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        setTheme(systemTheme); // Optional: update when system theme changes
    }, [systemTheme]);

    return (
        <commonContext.Provider value={{ theme, toggleTheme, isLoggedIn, setisLoggedIn ,courses, setCourses}}>
            {children}
        </commonContext.Provider>
    );
};
