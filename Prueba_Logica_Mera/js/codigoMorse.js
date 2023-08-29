document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const translateButton = document.getElementById("translateButton");
  const table = document.querySelector("table");

  translateButton.addEventListener("click", () => {
    const inputValue = inputText.value.trim();

    if (inputValue !== "") {
      const translation = isMorse(inputValue) ? translateMorse(inputValue) : translateText(inputValue);
      addTranslationToTable(inputValue, translation);
      inputText.value = "";
    } else {
      alert("Por favor, ingrese un texto o código Morse válido.");
    }
  });

  const morseToText = {
    ".-": "a", "-...": "b", "-.-.": "c", "-..": "d", ".": "e",
    "..-.": "f", "--.": "g", "....": "h", "..": "i", ".---": "j",
    "-.-": "k", ".-..": "l", "--": "m", "-.": "n", "---": "o",
    ".--.": "p", "--.-": "q", ".-.": "r", "...": "s", "-": "t",
    "..-": "u", "...-": "v", ".--": "w", "-..-": "x", "-.--": "y",
    "--..": "z",
  };

  const textToMorse = Object.fromEntries(Object.entries(morseToText).map(([key, value]) => [value, key]));

  function isMorse(input) {
    return /^[.-\s/]*$/.test(input);
  }

  function translateMorse(morse) {
    return morse.split(" / ").map(word => word.split(" ").map(symbol => morseToText[symbol] || " ").join("")).join(" ");
  }

  function translateText(text) {
    return text.split("").map(char => textToMorse[char.toLowerCase()] || "").join(" ");
  }

  function addTranslationToTable(text, translation) {
    const newRow = table.insertRow(1);
    const newTextCell = newRow.insertCell(0);
    const newTranslationCell = newRow.insertCell(1);
    newTextCell.textContent = text;
    newTranslationCell.textContent = translation;
  }
});
