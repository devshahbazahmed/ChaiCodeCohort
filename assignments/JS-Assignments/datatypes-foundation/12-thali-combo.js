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
function createThaliDescription(thali) {
  if (
    typeof thali !== "object" ||
    thali === null ||
    typeof thali.name !== "string" ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean" ||
    !Array.isArray(thali.items)
  )
    return "";
  let name = thali.name.toUpperCase();
  let price = thali.price.toFixed(2);
  let items = thali.items.join(", ");
  let isVeg = thali.isVeg ? "Veg" : "Non-Veg";
  return `${name} (${isVeg}) - Items: ${items} - Rs.${price}`;
}

function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) return null;
  const totalThalis = thalis.length;
  const vegArr = thalis.filter((thali) => thali.isVeg === true);
  const vegCount = vegArr.length;
  const nonVegArr = thalis.filter((thali) => thali.isVeg === false);
  const nonVegCount = nonVegArr.length;
  const prices = thalis.map((thali) => thali.price);
  const totalPrice = prices.reduce(
    (acc, currentPrice) => acc + currentPrice,
    0
  );
  const avgPrice = (totalPrice / prices.length).toFixed(2);
  const cheapest = Math.min(...prices);
  const costliest = Math.max(...prices);
  const names = thalis.map((thali) => thali.name);
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

function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") return [];

  const lowerQuery = query.toLowerCase();

  return thalis.filter((thali) => {
    const nameThali = thali.name?.toLowerCase().includes(lowerQuery);

    const itemsThali =
      Array.isArray(thali.items) &&
      thali.items.some((item) => item.toLowerCase().includes(lowerQuery));

    return nameThali || itemsThali;
  });
}

function generateThaliReceipt(customerName, thalis) {
  if (
    typeof customerName !== "string" ||
    thalis.length === 0 ||
    !Array.isArray(thalis)
  )
    return "";
  const finalName = customerName.toUpperCase();
  const itemCount = thalis.length;
  const prices = thalis.map((thali) => thali.price);
  const totalPrice = prices.reduce(
    (acc, currentPrice) => acc + currentPrice,
    0
  );
  const lineItem = thalis
    .map((thali) => `- ${thali.name} x Rs.${thali.price}`)
    .join("\n");
  return `THALI RECEIPT\n---\nCustomer: ${finalName}\n${lineItem}\n---\nTotal: Rs.${totalPrice}\nItems: ${itemCount}`;
}
