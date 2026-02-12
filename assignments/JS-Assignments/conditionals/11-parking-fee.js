/**
 * 🅿️ City Central Parking
 *
 * City Central Parking garage is the busiest in downtown. They need an
 * automated system to calculate parking fees. Different vehicle types
 * have different rates, and there's a daily maximum so customers
 * aren't overcharged.
 *
 * Rates (first hour / each additional hour):
 *   - "car":        $5 first hour, then $3/hour
 *   - "motorcycle": $3 first hour, then $2/hour
 *   - "bus":        $10 first hour, then $7/hour
 *
 * Daily Maximum (fee can never exceed this):
 *   - "car":        $30
 *   - "motorcycle": $18
 *   - "bus":        $60
 *
 * Rules:
 *   - Partial hours are rounded UP (e.g., 1.5 hours → 2 hours)
 *   - The fee should never exceed the daily maximum
 *   - If hours is 0 or negative, return -1
 *   - If vehicleType is not "car", "motorcycle", or "bus", return -1
 *
 * Examples:
 *   - car, 1 hour     → $5
 *   - car, 3 hours    → $5 + $3 + $3 = $11
 *   - car, 0.5 hours  → rounds up to 1 hour → $5
 *   - car, 24 hours   → $5 + 23×$3 = $74 → capped at $30
 *
 * @param {number} hours - Number of hours parked
 * @param {string} vehicleType - "car", "motorcycle", or "bus"
 * @returns {number} Parking fee or -1 for invalid input
 */

function calculateParkingFee(hours, vehicleType) {
  const maxFeeForVehicle = {
    car: 30,
    motorcycle: 18,
    bus: 60,
  };
  hours = Math.ceil(hours);

  if (hours <= 0 || !maxFeeForVehicle.hasOwnProperty(vehicleType)) return -1;
  let fee = 0;

  if (vehicleType === "car") {
    if (hours === 1) {
      fee = Math.min(hours * 5, maxFeeForVehicle[vehicleType]);
    } else if (hours > 1) {
      fee = Math.min(5 + (hours - 1) * 3, maxFeeForVehicle[vehicleType]);
    }
  } else if (vehicleType === "motorcycle") {
    if (hours === 1) {
      fee = Math.min(hours * 3, maxFeeForVehicle[vehicleType]);
    } else if (hours > 1) {
      fee = Math.min(3 + (hours - 1) * 2, maxFeeForVehicle[vehicleType]);
    }
  } else if (vehicleType === "bus") {
    if (hours === 1) {
      fee = Math.min(hours * 10, maxFeeForVehicle[vehicleType]);
    } else if (hours > 1) {
      fee = Math.min(10 + (hours - 1) * 7, maxFeeForVehicle[vehicleType]);
    }
  }

  return fee;
}
