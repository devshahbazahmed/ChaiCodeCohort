/**
 * 💒 Shaadi RSVP Manager - Callback Functions
 *
 * Big fat Indian wedding ki planning chal rahi hai! Guest list manage
 * karna hai using callback functions. Callback matlab ek function jo
 * doosre function ko argument ke roop mein diya jaata hai.
 *
 * Functions:
 *
 *   1. processGuests(guests, filterFn)
 *      - guests: array of guest objects
 *      - filterFn: callback function that takes a guest, returns true/false
 *      - Returns: array of guests for which filterFn returned true
 *      - Agar guests not array or filterFn not function, return []
 *
 *   2. notifyGuests(guests, notifyCallback)
 *      - Calls notifyCallback(guest) for EACH guest in array
 *      - Collects return values from each callback call
 *      - Returns: array of callback results
 *      - Agar guests not array or notifyCallback not function, return []
 *
 *   3. handleRSVP(guest, onAccept, onDecline)
 *      - If guest.rsvp === "yes", call onAccept(guest) and return its result
 *      - If guest.rsvp === "no", call onDecline(guest) and return its result
 *      - If guest.rsvp is anything else, return null
 *      - Agar guest null/undefined or callbacks not functions, return null
 *
 *   4. transformGuestList(guests, ...transformFns)
 *      - Takes guest array and any number of transform functions
 *      - Each transformFn takes an array and returns a new array
 *      - Apply transforms LEFT to RIGHT (first fn first)
 *      - Return the final transformed array
 *      - Agar guests not array, return []
 *
 * Hint: Callbacks are just functions passed as arguments to other functions.
 *   The receiving function decides WHEN to call them.
 *
 * @example
 *   processGuests(
 *     [{ name: "Rahul", side: "bride" }, { name: "Priya", side: "groom" }],
 *     guest => guest.side === "bride"
 *   )
 *   // => [{ name: "Rahul", side: "bride" }]
 *
 *   handleRSVP({ name: "Amit", rsvp: "yes" }, g => `${g.name} is coming!`, g => `${g.name} declined`)
 *   // => "Amit is coming!"
 */
function processGuests(guests, filterFn) {
  if (!Array.isArray(guests) || typeof filterFn !== "function") return [];

  const filteredGuests = guests.filter((guest) => filterFn(guest));

  if (!filteredGuests) return [];

  return filteredGuests;
}

function notifyGuests(guests, notifyCallback) {
  if (!Array.isArray(guests) || typeof notifyCallback !== "function") return [];

  let notify = [];
  for (const guest of guests) {
    const value = notifyCallback(guest);
    notify.push(value);
  }

  return notify;
}

// const guests = [
//   { name: "Rahul", side: "bride", rsvp: "yes" },
//   { name: "Priya", side: "groom", rsvp: "no" },
//   { name: "Amit", side: "bride", rsvp: "yes" },
//   { name: "Neha", side: "groom", rsvp: "yes" },
//   { name: "Vikram", side: "bride", rsvp: "no" },
// ];

// const results = notifyGuests(guests, (g) => `Notified ${g.name}`);

// console.log(notifyGuests(guests, results));

function handleRSVP(guest, onAccept, onDecline) {
  if (
    !guest ||
    typeof onAccept !== "function" ||
    typeof onDecline !== "function"
  )
    return null;

  if (guest.rsvp === "yes") return onAccept(guest);
  else if (guest.rsvp === "no") return onDecline(guest);
  else return null;
}

const guest = { name: "Amit", rsvp: "yes" };

console.log(
  handleRSVP(
    guest,
    (g) => `${g.name} is coming!`,
    (g) => `${g.name} declined`
  )
);

function transformGuestList(guests, ...transformFns) {
  if (!Array.isArray(guests)) return [];

  let newArr = guests;

  for (let transformFn of transformFns) {
    if (typeof transformFn === "function") {
      newArr = transformFn(newArr);
    }
  }

  return newArr;
}
