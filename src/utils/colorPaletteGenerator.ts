// Color palette generator from uploaded images
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  warning: string;
  error: string;
}

export const generateColorPalette = async (imageUrl: string): Promise<ColorPalette> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(getDefaultPalette());
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const colors = extractColors(imageData);
      const palette = createPaletteFromColors(colors);
      
      resolve(palette);
    };

    img.onerror = () => {
      resolve(getDefaultPalette());
    };

    img.src = imageUrl;
  });
};

const extractColors = (imageData: ImageData): string[] => {
  const data = imageData.data;
  const colors: string[] = [];
  const step = Math.floor(data.length / 4 / 1000); // Sample every 1000th pixel

  for (let i = 0; i < data.length; i += step * 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a > 128) { // Only include opaque pixels
      const hex = rgbToHex(r, g, b);
      colors.push(hex);
    }
  }

  return colors;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const createPaletteFromColors = (colors: string[]): ColorPalette => {
  // Group similar colors and find dominant ones
  const colorGroups = groupSimilarColors(colors);
  const dominantColors = colorGroups
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(group => group.color);

  // Create palette based on dominant colors
  const primary = dominantColors[0] || '#32CD32';
  const secondary = dominantColors[1] || '#808080';
  const accent = dominantColors[2] || '#90EE90';
  const background = adjustBrightness(primary, -60) || '#1a1a1a';
  const text = getContrastColor(background);
  const success = dominantColors[3] || '#32CD32';
  const warning = dominantColors[4] || '#FFA500';
  const error = dominantColors[5] || '#FF6B6B';

  return {
    primary,
    secondary,
    accent,
    background,
    text,
    success,
    warning,
    error,
  };
};

const groupSimilarColors = (colors: string[]): Array<{ color: string; count: number }> => {
  const groups: { [key: string]: number } = {};
  
  colors.forEach(color => {
    const rounded = roundColor(color);
    groups[rounded] = (groups[rounded] || 0) + 1;
  });

  return Object.entries(groups).map(([color, count]) => ({ color, count }));
};

const roundColor = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Round to nearest 32 for grouping
  const roundedR = Math.round(r / 32) * 32;
  const roundedG = Math.round(g / 32) * 32;
  const roundedB = Math.round(b / 32) * 32;
  
  return rgbToHex(roundedR, roundedG, roundedB);
};

const adjustBrightness = (hex: string, amount: number): string => {
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
  
  return rgbToHex(r, g, b);
};

const getContrastColor = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const getDefaultPalette = (): ColorPalette => ({
  primary: '#32CD32',
  secondary: '#808080',
  accent: '#90EE90',
  background: '#1a1a1a',
  text: '#FFFFFF',
  success: '#32CD32',
  warning: '#FFA500',
  error: '#FF6B6B',
});

export const getThemePalettes = (): { [key: string]: ColorPalette } => ({
  green: {
    primary: '#32CD32',
    secondary: '#808080',
    accent: '#90EE90',
    background: '#1a1a1a',
    text: '#FFFFFF',
    success: '#32CD32',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  red: {
    primary: '#FF6B6B',
    secondary: '#FFB3B3',
    accent: '#FF8E8E',
    background: '#2D1B1B',
    text: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  orange: {
    primary: '#FFA500',
    secondary: '#FFB84D',
    accent: '#FFC966',
    background: '#2D2419',
    text: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  purple: {
    primary: '#9C27B0',
    secondary: '#BA68C8',
    accent: '#CE93D8',
    background: '#2D1B2D',
    text: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  pink: {
    primary: '#E91E63',
    secondary: '#F06292',
    accent: '#F48FB1',
    background: '#2D1B24',
    text: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  yellow: {
    primary: '#FFEB3B',
    secondary: '#FFF176',
    accent: '#FFF59D',
    background: '#2D2D1B',
    text: '#000000',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  blue: {
    primary: '#2196F3',
    secondary: '#64B5F6',
    accent: '#90CAF9',
    background: '#1B2D2D',
    text: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
  grey: {
    primary: '#808080',
    secondary: '#A9A9A9',
    accent: '#C0C0C0',
    background: '#1a1a1a',
    text: '#FFFFFF',
    success: '#32CD32',
    warning: '#FFA500',
    error: '#FF6B6B',
  },
});
