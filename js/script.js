
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
  heading.className = "text-2xl font-bold text-indigo-700";

  const phonetic = document.createElement("p");
  phonetic.textContent =
    word.phonetic || "Pronunciation not available";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Word";

  saveButton.className =
    "rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700";

  saveButton.addEventListener("click", function () {
    const result = saveWord(word);

    if (result) {
      alert("Word saved successfully!");
      displaySavedWords();
    } else {
      alert("This word is already saved!");
    }
  });

  wordResult.append(heading, phonetic, saveButton);

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

function displaySavedWords() {
  const savedWords = getSavedWords();

  const savedContainer = document.getElementById("saved-words");

  savedContainer.innerHTML = "";

  if (savedWords.length === 0) {
    savedContainer.textContent = "No saved words yet.";
    return;
  }

  savedWords.forEach(function (word) {
    const card = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = word.word;

    const definition = document.createElement("p");
    definition.textContent =
      word.meanings[0].definitions[0].definition;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.className =
      "rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600";

    deleteButton.addEventListener("click", function () {
      removeWord(word.word);
      displaySavedWords();
    });

    card.className = "rounded-xl border border-slate-200 p-4 space-y-3";

    card.append(heading, definition, deleteButton);

    savedContainer.append(card);
  });
}

displaySavedWords();

