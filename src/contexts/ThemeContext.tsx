import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorPalette, getDefaultPalette, getThemePalettes, generateColorPalette } from '../utils/colorPaletteGenerator';

interface ThemeContextType {
  palette: ColorPalette;
  isDyslexiaMode: boolean;
  customFont: string;
  // Only highlight color is customizable
  highlightColor: string;
  // Fixed colors for different contexts
  backgroundColor: string;
  incompleteColor: string;
  glassColor: string;
  updatePalette: (palette: ColorPalette) => void;
  setTheme: (themeName: string) => void;
  generateFromImage: (imageUrl: string) => Promise<void>;
  toggleDyslexiaMode: () => void;
  setCustomFont: (font: string) => void;
  // Only highlight color setter
  setHighlightColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [palette, setPalette] = useState<ColorPalette>(getDefaultPalette());
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [customFont, setCustomFont] = useState('Inter');
  
  // Only highlight color is customizable
  const [highlightColor, setHighlightColor] = useState('#32CD32');
  
  // Fixed colors for different contexts
  const backgroundColor = '#1A1A1A';
  const incompleteColor = '#666666';
  const glassColor = 'rgba(255, 255, 255, 0.1)';

  useEffect(() => {
    // Load saved theme from localStorage
    const savedPalette = localStorage.getItem('adhd_theme_palette');
    const savedDyslexiaMode = localStorage.getItem('adhd_dyslexia_mode');
    const savedFont = localStorage.getItem('adhd_custom_font');
    const savedHighlightColor = localStorage.getItem('adhd_highlight_color');

    if (savedPalette) {
      setPalette(JSON.parse(savedPalette));
    }
    if (savedDyslexiaMode) {
      setIsDyslexiaMode(JSON.parse(savedDyslexiaMode));
    }
    if (savedFont) {
      setCustomFont(savedFont);
    }
    if (savedHighlightColor) {
      setHighlightColor(savedHighlightColor);
    }
  }, []);

  const updatePalette = (newPalette: ColorPalette) => {
    setPalette(newPalette);
    localStorage.setItem('adhd_theme_palette', JSON.stringify(newPalette));
  };

  const setTheme = (themeName: string) => {
    const themes = getThemePalettes();
    if (themes[themeName]) {
      updatePalette(themes[themeName]);
    }
  };

  const generateFromImage = async (imageUrl: string) => {
    try {
      const newPalette = await generateColorPalette(imageUrl);
      updatePalette(newPalette);
    } catch (error) {
      console.error('Failed to generate palette from image:', error);
    }
  };

  const toggleDyslexiaMode = () => {
    const newMode = !isDyslexiaMode;
    setIsDyslexiaMode(newMode);
    localStorage.setItem('adhd_dyslexia_mode', JSON.stringify(newMode));
  };

  const handleSetCustomFont = (font: string) => {
    setCustomFont(font);
    localStorage.setItem('adhd_custom_font', font);
  };

  const handleSetHighlightColor = (color: string) => {
    setHighlightColor(color);
    localStorage.setItem('adhd_highlight_color', color);
  };

  // Apply dynamic styles
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply only highlight color (customizable)
    root.style.setProperty('--highlight-color', highlightColor);
    
    // Apply fixed colors
    root.style.setProperty('--background-color', backgroundColor);
    root.style.setProperty('--incomplete-color', incompleteColor);
    root.style.setProperty('--glass-color', glassColor);
    
    // Apply color palette (legacy support)
    root.style.setProperty('--primary-color', palette.primary);
    root.style.setProperty('--secondary-color', palette.secondary);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--text-color', palette.text);
    root.style.setProperty('--success-color', palette.success);
    root.style.setProperty('--warning-color', palette.warning);
    root.style.setProperty('--error-color', palette.error);

    // Apply custom font
    root.style.setProperty('--custom-font', customFont);

    // Apply dyslexia mode
    if (isDyslexiaMode) {
      root.style.setProperty('--main-font-family', 'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
    } else {
      root.style.setProperty('--main-font-family', `${customFont}, Inter, Roboto, sans-serif`);
    }
  }, [palette, isDyslexiaMode, customFont, highlightColor]);

  const value = {
    palette,
    isDyslexiaMode,
    customFont,
    highlightColor,
    backgroundColor,
    incompleteColor,
    glassColor,
    updatePalette,
    setTheme,
    generateFromImage,
    toggleDyslexiaMode,
    setCustomFont: handleSetCustomFont,
    setHighlightColor: handleSetHighlightColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
