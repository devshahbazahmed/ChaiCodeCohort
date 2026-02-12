/**
 * 🍽️ TipEasy - Restaurant Tip Calculator
 *
 * You're building TipEasy, an app that helps diners calculate the right
 * tip based on how they'd rate their dining experience. No more awkward
 * mental math at the table!
 *
 * Service Rating → Tip Percentage:
 *   - 1 (terrible)  → 5%
 *   - 2 (poor)      → 10%
 *   - 3 (okay)      → 15%
 *   - 4 (good)      → 20%
 *   - 5 (excellent) → 25%
 *
 * Return an object with:
 *   - tipPercentage: the percentage as a number (e.g., 15)
 *   - tipAmount: the calculated tip rounded to 2 decimal places
 *   - totalAmount: bill + tip rounded to 2 decimal places
 *
 * Rules:
 *   - If billAmount is 0 or negative, return null
 *   - If serviceRating is not an integer from 1 to 5, return null
 *
 * Example:
 *   calculateTip(50, 4)
 *   → { tipPercentage: 20, tipAmount: 10.00, totalAmount: 60.00 }
 *
 * @param {number} billAmount - The bill amount in dollars
 * @param {number} serviceRating - Service rating from 1 to 5
 * @returns {{ tipPercentage: number, tipAmount: number, totalAmount: number } | null}
 */

function calculateTip(billAmount, serviceRating) {
  if (
    billAmount <= 0 ||
    !Number.isInteger(serviceRating) ||
    serviceRating < 1 ||
    serviceRating > 5 ||
    typeof serviceRating !== "number" ||
    typeof billAmount !== "number"
  )
    return null;

  const tipBill = {
    tipPercentage: 0,
    tipAmount: 0,
    totalAmount: 0,
  };

  if (serviceRating === 1) {
    tipBill.tipPercentage = 5;
  } else if (serviceRating === 2) {
    tipBill.tipPercentage = 10;
  } else if (serviceRating === 3) {
    tipBill.tipPercentage = 15;
  } else if (serviceRating === 4) {
    tipBill.tipPercentage = 20;
  } else if (serviceRating === 5) {
    tipBill.tipPercentage = 25;
  }

  tipBill.tipAmount = Number(
    (billAmount * (tipBill.tipPercentage / 100)).toFixed(2)
  );
  tipBill.totalAmount = Number(billAmount + tipBill.tipAmount);

  return tipBill;
}
