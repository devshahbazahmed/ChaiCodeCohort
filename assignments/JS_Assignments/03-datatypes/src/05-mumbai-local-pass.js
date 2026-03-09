/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  if (
    typeof passenger !== "object" ||
    !passenger ||
    passenger.name === "" ||
    passenger.from === "" ||
    passenger.to === "" ||
    passenger.classType === "" ||
    !passenger.name ||
    !passenger.from ||
    !passenger.to ||
    !passenger.classType
  )
    return "INVALID PASS";

  const passName = passenger.name.toUpperCase();
  const lowerFrom = passenger.from.toLowerCase();
  const passFrom = lowerFrom.charAt(0).toUpperCase() + lowerFrom.slice(1);
  const lowerTo = passenger.to.toLowerCase();
  const passTo = lowerTo.charAt(0).toUpperCase() + lowerTo.slice(1);

  const passClassType = passenger.classType.toLowerCase();
  if (passClassType !== "first" && passClassType !== "second")
    return "INVALID PASS";

  const passId =
    passClassType.charAt(0).toUpperCase() +
    lowerFrom.slice(0, 3).toUpperCase() +
    lowerTo.slice(0, 3).toUpperCase();
  return `MUMBAI LOCAL PASS\n---\nName: ${passName}\nFrom: ${passFrom}\nTo: ${passTo}\nClass: ${passClassType.toUpperCase()}\nPass ID: ${passId}`;
}
