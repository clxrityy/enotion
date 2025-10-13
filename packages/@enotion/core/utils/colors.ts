export function getRGBfromHex(
  hex: string,
): { r: number; g: number; b: number } | null {
  // Remove the leading '#' if present
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  // Handle shorthand hex codes (e.g., #03F)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Ensure the hex code is valid
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export function convertRGBtoString(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function getHexFromRGB(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function lightenHexColor(hex: string, amount: number): string | null {
  const rgb = getRGBfromHex(hex);
  if (!rgb) return null;

  const r = Math.min(255, Math.max(0, rgb.r + amount));
  const g = Math.min(255, Math.max(0, rgb.g + amount));
  const b = Math.min(255, Math.max(0, rgb.b + amount));

  return getHexFromRGB(r, g, b);
}

export function darkenHexColor(hex: string, amount: number): string | null {
  return lightenHexColor(hex, -amount);
}

export function adjustHexColorOpacity(
  hex: string,
  opacity: number,
): string | null {
  const rgb = getRGBfromHex(hex);
  if (!rgb) return null;

  const alpha = Math.min(1, Math.max(0, opacity));
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alphaHex}`;
}

export function isValidHexColor(hex: string): boolean {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex);
}

export function blendHexColors(
  hex1: string,
  hex2: string,
  ratio: number,
): string | null {
  const rgb1 = getRGBfromHex(hex1);
  const rgb2 = getRGBfromHex(hex2);
  if (!rgb1 || !rgb2) return null;

  const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
  const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
  const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

  return getHexFromRGB(r, g, b);
}
