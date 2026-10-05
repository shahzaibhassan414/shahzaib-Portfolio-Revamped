// Contrast helpers for text on project colours (WCAG 2 relative luminance).

const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const luminance = (rgb: number[]) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const toHex = (rgb: number[]) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;

/**
 * The project colour, darkened only as much as needed for white text to reach 4.5:1.
 * Used behind the white initials on project badges; colours that already pass are unchanged.
 */
export function onWhiteText(hex: string, target = 4.6) {
  let rgb = channels(hex);
  while (1.05 / (luminance(rgb) + 0.05) < target) rgb = rgb.map((c) => c * 0.97);
  return toHex(rgb);
}
