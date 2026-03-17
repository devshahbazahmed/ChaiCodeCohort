const typeColor = document.querySelector("#color-type");
const toneColor = document.querySelector("#color-tone");
const generateBtn = document.querySelector("#generate-btn");
const palette = document.querySelector(".colors");

function randomRgb(tone) {
  let min = 0;
  let max = 255;

  if (tone === "light") {
    min = 150;
    max = 255;
  }

  if (tone === "dark") {
    min = 0;
    max = 125;
  }

  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function generatePalette() {
  palette.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const { r, g, b } = randomRgb(toneColor.value);

    let color;

    if (typeColor.value === "hex") {
      color = rgbToHex(r, g, b);
    } else {
      color = `rgb(${r}, ${g}, ${b})`;
    }

    const div = document.createElement("div");
    div.classList.add("color");

    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    div.textContent = color;

    palette.appendChild(div);
  }
}

generateBtn.addEventListener("click", generatePalette);
generatePalette();
