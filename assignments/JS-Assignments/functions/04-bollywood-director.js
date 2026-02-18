/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
function createDialogueWriter(genre) {
  const allGenres = ["action", "romance", "comedy", "drama"];
  if (!allGenres.includes(genre)) return null;
  return function actionWriter(hero, villain) {
    if (!hero || !villain) return "...";

    const lowerGenre = genre.toLowerCase();

    if (!lowerGenre) return null;

    switch (lowerGenre) {
      case allGenres[0]:
        return `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
      case allGenres[1]:
        return `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
      case allGenres[2]:
        return `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`;
      case allGenres[3]:
        return `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
      default:
        return null;
    }
  };
}

const actionWriter = createDialogueWriter("comedy");
console.log(actionWriter("Tiger", "Pathan"));

function createTicketPricer(basePrice) {
  if (basePrice <= 0) return null;
  const seatMultiplier = {
    silver: 1,
    gold: 1.5,
    platinum: 2,
  };
  return function (seatType, isWeekend = false) {
    let totalPrice = 1;
    if (Object.keys(seatMultiplier).includes(seatType)) {
      totalPrice = basePrice * seatMultiplier[seatType];
    } else {
      return null;
    }

    if (isWeekend) {
      totalPrice = totalPrice * 1.3;
    }
    return Math.round(totalPrice);
  };
}

const ticketPrice = createTicketPricer(250);
console.log(ticketPrice(true));

function createRatingCalculator(weights) {
  if (typeof weights !== "object" || !weights) return null;
  return function (scores) {
    let totalAvg = 0;
    for (const weight in weights) {
      for (const score in scores) {
        if (weight === score) {
          console.log(parseFloat((weights[weight] * scores[score]).toFixed(1)));

          totalAvg += parseFloat((weights[weight] * scores[score]).toFixed(1));
        }
      }
    }
    return totalAvg;
  };
}

const ratingCalculator = createRatingCalculator({
  story: 0.3,
  acting: 0.3,
  direction: 0.2,
  music: 0.2,
});

console.log(ratingCalculator({ story: 8, acting: 9, direction: 7, music: 8 }));
