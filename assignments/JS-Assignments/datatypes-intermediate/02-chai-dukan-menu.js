/**
 * ☕ Raju ki Chai Dukaan - Menu Formatter
 *
 * Raju bhai ne apni chai dukaan ka menu digitize karna decide kiya hai.
 * Items ka array milega, aur tujhe ek formatted menu string banana hai
 * jisme har item ka naam UPPERCASE mein ho aur price ke saath likha ho.
 *
 * Rules:
 *   - items ek array hai of objects: [{ name: "masala chai", price: 15 }, ...]
 *   - Har item ka naam toUpperCase() karo
 *   - Format: "NAAM - Rs.PRICE" (e.g., "MASALA CHAI - Rs.15")
 *   - Saare formatted items ko " | " se join karo
 *   - Items jinka price 0 ya negative hai, unhe skip karo (filter out)
 *   - Items jinka naam empty string hai ya string nahi hai, unhe bhi skip karo
 *   - Hint: Use Array.isArray(), filter(), map(), join(), toUpperCase()
 *
 * Validation:
 *   - Agar items array nahi hai ya empty hai, return ""
 *
 * @param {Array<{name: string, price: number}>} items - Menu items
 * @returns {string} Formatted menu string
 *
 * @example
 *   formatChaiMenu([{ name: "masala chai", price: 15 }, { name: "samosa", price: 12 }])
 *   // => "MASALA CHAI - Rs.15 | SAMOSA - Rs.12"
 *
 *   formatChaiMenu([])
 *   // => ""
 */

function formatChaiMenu(items) {
  if (!Array.isArray(items) || items.length === 0) return "";

  let result = [];
  for (let item of items) {
    const itemName = item.name.toUpperCase();
    const itemPrice = item.price;
    if (itemPrice <= 0 || itemName === "" || typeof itemName !== "string")
      continue;
    result.push(`${itemName} - Rs.${itemPrice}`);
  }

  return result.join(" | ");
}

console.log(
  formatChaiMenu([
    { name: "masala chai", price: 15 },
    { name: "samosa", price: 12 },
    { name: "", price: 12 },
    { name: "chai", price: -1 },
  ])
);
console.log(formatChaiMenu([]));
