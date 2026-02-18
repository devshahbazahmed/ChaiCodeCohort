/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
function mixColors(color1, color2) {
  if (!color1 || !color2) return null;

  let mixedColor = {
    name: "",
    r: 0,
    g: 0,
    b: 0,
  };

  mixedColor.name = `${color1.name}-${color2.name}`;
  mixedColor.r = Math.ceil((color1.r + color2.r) / 2);
  mixedColor.g = Math.ceil((color1.g + color2.g) / 2);
  mixedColor.b = Math.ceil((color1.b + color2.b) / 2);

  return mixedColor;
}

const red = { name: "red", r: 255, g: 0, b: 0 };
const blue = { name: "blue", r: 0, g: 0, b: 255 };
console.log(mixColors(red, blue));

function adjustBrightness(color, factor) {
  if (!color || typeof color !== "object" || typeof factor !== "number")
    return null;

  let result = { ...color };

  for (const key in color) {
    if (typeof color[key] === "number") {
      result[key] = Math.min(Math.max(0, color[key] * factor), 255);
    }
  }

  return result;
}

const bright = { name: "bright", r: 200, g: 200, b: 200 };
console.log(adjustBrightness(bright, 2));

function addToPalette(palette, color) {
  if (!Array.isArray(palette)) return [color];

  let result = [...palette, color];

  if (!color) result = [...palette];

  return result;
}

function removeFromPalette(palette, colorName) {
  if (!Array.isArray(palette)) return [];

  return palette.filter((color) => color?.name !== colorName);
}

function mergePalettes(palette1, palette2) {
  const arr1 = Array.isArray(palette1) ? palette1 : [];
  const arr2 = Array.isArray(palette2) ? palette2 : [];

  const merged = [...arr1, ...arr2];
  const seen = new Set();
  const result = [];

  for (let color of merged) {
    const name = color?.name;

    if (!name || seen.has(name)) continue;

    seen.add(name);
    result.push(color);
  }

  return result;
}
