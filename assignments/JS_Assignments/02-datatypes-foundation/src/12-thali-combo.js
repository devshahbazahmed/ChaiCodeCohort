/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    !thali ||
    typeof thali !== "object" ||
    typeof thali.name !== "string" ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean" ||
    !Array.isArray(thali.items)
  )
    return "";

  const thaliName = thali.name.toUpperCase();
  const thaliType = thali.isVeg ? "Veg" : "Non-Veg";
  const thaliPrice = thali.price.toFixed(2);
  const thaliItems = thali.items.join(", ");

  return `${thaliName} (${thaliType}) - Items: ${thaliItems} - Rs.${thaliPrice}`;
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) return null;

  const totalThalis = thalis.length;
  const vegCount = thalis.filter((t) => t.isVeg === true).length;
  const nonVegCount = thalis.filter((t) => t.isVeg === false).length;
  const prices = thalis.map((t) => t.price);
  const names = thalis.map((t) => t.name);
  const totalPrice = thalis.reduce((acc, tCurrent) => acc + tCurrent.price, 0);
  const avgPrice = (totalPrice / totalThalis).toFixed(2);
  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);

  return {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names,
  };
}

export function searchThaliMenu(thalis, query) {
  if (
    !Array.isArray(thalis) ||
    thalis.length === 0 ||
    typeof query !== "string" ||
    query === ""
  )
    return [];

  const lowerQuery = query.toLowerCase();
  const filteredThalis = thalis.filter(
    (thali) =>
      thali.name.toLowerCase().includes(lowerQuery) ||
      thali.items.some((item) => item.toLowerCase().includes(lowerQuery))
  );
  return filteredThalis;
}

export function generateThaliReceipt(customerName, thalis) {
  if (
    !Array.isArray(thalis) ||
    thalis.length === 0 ||
    typeof customerName !== "string" ||
    customerName === ""
  )
    return "";

  const lineItems = thalis
    .map((t) => {
      return `- ${t.name} x Rs.${t.price}`;
    })
    .join("\n");

  const count = thalis.length;

  const total = thalis.reduce((acc, current) => acc + current.price, 0);

  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItems}\n---\nTotal: Rs.${total}\nItems: ${count}`;
}
