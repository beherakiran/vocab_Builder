
async function searchWord(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    throw new Error("Word not found");
  }

  const data = await response.json();

  return data[0];
}

const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const message = document.getElementById("message");
const wordResult = document.getElementById("word-result");

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const word = wordInput.value.trim();

  if (word === "") {
    message.textContent = "Please enter a word.";
    return;
  }

  message.textContent = "Loading...";
  wordResult.innerHTML = "";

  try {
    const result = await searchWord(word);

    message.textContent = "";
    displayWord(result);
  } catch (error) {
    message.textContent = "Word not found. Please try another word.";
  }
});

function displayWord(word) {
  wordResult.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = word.word;

  const phonetic = document.createElement("p");
  phonetic.textContent = word.phonetic || "Pronunciation not available";

  wordResult.append(heading, phonetic);

  word.meanings.forEach(function (meaning) {
    const partOfSpeech = document.createElement("h4");
    partOfSpeech.textContent = meaning.partOfSpeech;

    const definition = document.createElement("p");
    definition.textContent = meaning.definitions[0].definition;

    const example = document.createElement("p");
    example.textContent =
      meaning.definitions[0].example || "No example available";

    wordResult.append(partOfSpeech, definition, example);
  });
}

