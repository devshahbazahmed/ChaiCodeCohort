/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (!name || !mealType) return null;

  const perDayMealPrices = {
    veg: 80,
    nonveg: 120,
    jain: 90,
  };

  if (!Object.keys(perDayMealPrices).includes(mealType)) return null;

  const dailyRate = perDayMealPrices[mealType];
  const totalCost = dailyRate * days;

  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost,
  };
}

function combinePlans(...plans) {
  if (!Array.isArray(plans) || plans.length === 0) {
    return null;
  }

  const totalCustomers = plans.length;
  const totalRevenue = plans.reduce((sum, total) => sum + total.totalCost, 0);
  const mealBreakdown = {
    veg: 0,
    nonveg: 0,
  };

  for (const plan of plans) {
    console.log(plan);
    if (plan.mealType === "veg") mealBreakdown.veg += 1;
    else if (plan.mealType === "nonveg") mealBreakdown.nonveg += 1;
  }

  return {
    totalCustomers,
    totalRevenue,
    mealBreakdown,
  };
}

const plan1 = {
  name: "Rahul",
  mealType: "veg",
  days: 30,
  dailyRate: 80,
  totalCost: 2400,
};
const plan2 = {
  name: "Amit",
  mealType: "nonveg",
  days: 15,
  dailyRate: 120,
  totalCost: 1800,
};
const plan3 = {
  name: "Priya",
  mealType: "veg",
  days: 30,
  dailyRate: 80,
  totalCost: 2400,
};
console.log(combinePlans(plan1, plan2, plan3));

function applyAddons(plan, ...addons) {
  if (!plan) return null;

  if (addons.length === 0) return plan;

  let totalAddOn = 0;
  let addonNames = [];
  for (const addon of addons) {
    totalAddOn += addon.price;
    addonNames.push(addon.name);
  }

  const newDailyRate = plan.dailyRate + totalAddOn;
  const newTotalCost = newDailyRate * plan.days;

  const newPlan = {
    name: plan.name,
    mealType: plan.mealType,
    days: plan.days,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames,
  };

  return newPlan;
}

const basePlan = {
  name: "Rahul",
  mealType: "veg",
  days: 30,
  dailyRate: 80,
  totalCost: 2400,
};

console.log(
  applyAddons(
    basePlan,
    { name: "raita", price: 15 },
    { name: "papad", price: 10 }
  )
);
