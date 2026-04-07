/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (!containerElement) return null;
  const handler = (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const guestItem = btn.closest(".guest-item");
    if (guestItem) {
      guestItem.remove();
    }
  };
  containerElement.addEventListener("click", handler);

  return {
    addGuest(name, side) {
      const div = document.createElement("div");
      div.classList.add("guest-item");
      div.setAttribute("data-name", name);
      div.setAttribute("data-side", side);
      const span = document.createElement("span");
      span.textContent = name;
      const button = document.createElement("button");
      button.classList.add("remove-btn");
      button.textContent = "Remove";
      div.appendChild(span);
      div.appendChild(button);
      containerElement.appendChild(div);
      return div;
    },
    removeGuest(name) {
      const guestItem = containerElement.querySelector(
        `.guest-item[data-name="${name}"]`
      );

      if (guestItem) {
        guestItem.remove();
        return true;
      }
      return false;
    },
    getGuests() {
      const guests = containerElement.querySelectorAll(".guest-item");

      return Array.from(guests).map((el) => ({
        name: el.dataset.name,
        side: el.dataset.side,
      }));
    }
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  if (!containerElement || !previewElement) return null;

  const themes = ["traditional", "modern", "royal"];

  themes.forEach((theme) => {
    const btn = document.createElement("button");
    btn.classList.add("theme-btn");
    btn.textContent = theme;
    btn.dataset.theme = theme;
    containerElement.appendChild(btn);
  });

  containerElement.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-btn");
    if (!btn) return;

    const theme = btn.dataset.theme;
    previewElement.className = theme;
    previewElement.dataset.theme = theme;
  });

  return {
    getTheme() {
      return previewElement.dataset.theme || null;
    }
  };
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  const clearEditing = () => {
    const allEditing = cardElement.querySelectorAll(".editing");

    allEditing.forEach((el) => {
      el.classList.remove("editing");
      el.contentEditable = "false";
    });
  };

  cardElement.addEventListener("click", (e) => {
    const editable = e.target.closest("[data-editable]");

    if (editable) {
      clearEditing();

      editable.contentEditable = "true";
      editable.classList.add("editing");
      return;
    }

    clearEditing();
  });

  return {
    getContent(field) {
      const el = cardElement.querySelector(`[data-editable="${field}"]`);
      return el ? el.textContent : null;
    },
  };
};



