import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorPalette, getDefaultPalette, getThemePalettes, generateColorPalette } from '../utils/colorPaletteGenerator';

interface ThemeContextType {
  palette: ColorPalette;
  isDyslexiaMode: boolean;
  customFont: string;
  customFontColor: string;
  updatePalette: (palette: ColorPalette) => void;
  setTheme: (themeName: string) => void;
  generateFromImage: (imageUrl: string) => Promise<void>;
  toggleDyslexiaMode: () => void;
  setCustomFont: (font: string) => void;
  setCustomFontColor: (color: string) => void;
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
  const [customFontColor, setCustomFontColor] = useState('#FFFFFF');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedPalette = localStorage.getItem('adhd_theme_palette');
    const savedDyslexiaMode = localStorage.getItem('adhd_dyslexia_mode');
    const savedFont = localStorage.getItem('adhd_custom_font');
    const savedFontColor = localStorage.getItem('adhd_custom_font_color');

    if (savedPalette) {
      setPalette(JSON.parse(savedPalette));
    }
    if (savedDyslexiaMode) {
      setIsDyslexiaMode(JSON.parse(savedDyslexiaMode));
    }
    if (savedFont) {
      setCustomFont(savedFont);
    }
    if (savedFontColor) {
      setCustomFontColor(savedFontColor);
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

  const handleSetCustomFontColor = (color: string) => {
    setCustomFontColor(color);
    localStorage.setItem('adhd_custom_font_color', color);
  };

  // Apply dynamic styles
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply color palette
    root.style.setProperty('--primary-color', palette.primary);
    root.style.setProperty('--secondary-color', palette.secondary);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--background-color', palette.background);
    root.style.setProperty('--text-color', palette.text);
    root.style.setProperty('--success-color', palette.success);
    root.style.setProperty('--warning-color', palette.warning);
    root.style.setProperty('--error-color', palette.error);
    
    // Apply theme colors to all components
    root.style.setProperty('--theme-primary', palette.primary);
    root.style.setProperty('--theme-secondary', palette.secondary);
    root.style.setProperty('--theme-accent', palette.accent);
    root.style.setProperty('--theme-text', '#000000'); // Always use black text for better readability
    root.style.setProperty('--theme-background', palette.background);
    
    // Add text shadow for better contrast
    root.style.setProperty('--text-shadow', '1px 1px 2px rgba(255, 255, 255, 0.8)');

    // Apply custom font
    root.style.setProperty('--custom-font', customFont);
    root.style.setProperty('--custom-font-color', customFontColor);

    // Apply dyslexia mode
    if (isDyslexiaMode) {
      root.style.setProperty('--main-font-family', 'OpenDyslexic, sans-serif');
      document.body.style.fontFamily = 'OpenDyslexic, sans-serif';
    } else {
      root.style.setProperty('--main-font-family', `${customFont}, Inter, Roboto, sans-serif`);
      document.body.style.fontFamily = `${customFont}, Inter, Roboto, sans-serif`;
    }
  }, [palette, isDyslexiaMode, customFont, customFontColor]);

  const value = {
    palette,
    isDyslexiaMode,
    customFont,
    customFontColor,
    updatePalette,
    setTheme,
    generateFromImage,
    toggleDyslexiaMode,
    setCustomFont: handleSetCustomFont,
    setCustomFontColor: handleSetCustomFontColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
