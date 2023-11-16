/* eslint-disable react/prop-types */
// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import { useState, createContext } from "react";

// CREATING A THEMECONTEXT AVAILABLE ACROSS THE APP
export const ThemeContext = createContext(null);

// A FUNCTION THAT MAKES THE CONTEXT AVAILABLE THROUGHOUT THE APP AFTER EXPORT
export default function ThemeContextProvider({ children }) {
  // A BOOLEAN TO TRACK THE MODE
  const [mode, setMode] = useState("light");
  
  // A FUNCTION TO TOGGLE BETWEEN LIGHT AND DARK MODES
  const toggleTheme = () => {
    setMode((mode) => (mode === "light" ? "dark" : "light"));
  };
  
  return (
    <ThemeContext.Provider value={[ mode, toggleTheme ]}>
      {children}
    </ThemeContext.Provider>
  );
}
