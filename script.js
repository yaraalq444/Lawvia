async function translateText() {
  const input = document.getElementById("inputText").value;
  const mode = document.getElementById("mode").value;
  const output = document.getElementById("outputText");

  output.value = "Translating...";

  // ⚡ Placeholder translation logic (AI integration comes later)
  // For now, we fake it so the site works
  setTimeout(() => {
    if (mode === "toLegalese") {
      output.value = "Here’s your text in more formal legal language:\n\n" + input;
    } else {
      output.value = "Here’s your text simplified into plain English:\n\n" + input;
    }
  }, 1500);
}
