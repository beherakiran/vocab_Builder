const searchForm = document.getElementById("search-form");
const wordInput = document.getElementById("word-input");
const message = document.getElementById("message");
const wordResult = document.getElementById("word-result");
const savedSearch = document.getElementById("saved-search");

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
    message.textContent = error.message;
  }
});

savedSearch.addEventListener("input", function () {
  const searchText = savedSearch.value.toLowerCase();

  const savedWords = getSavedWords();

  const filteredWords = savedWords.filter(function (word) {
    return word.word.toLowerCase().includes(searchText);
  });

  displaySavedWords(filteredWords);
});

function displayWord(word) {
  wordResult.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = word.word;
  heading.className = "text-2xl font-bold text-indigo-700";

  const phonetic = document.createElement("p");
  phonetic.textContent = word.phonetic || "Pronunciation not available";

  const phonetics = word.phonetics || [];

  const audioData =
    phonetics.find(function (item) {
      return item.audio && item.audio.includes("-us.mp3");
    }) ||
    phonetics.find(function (item) {
      return item.audio && item.audio !== "";
    });
  //console.log("Audio data:", audioData);

  const audioButton = document.createElement("button");
  audioButton.textContent = "Play Pronunciation";
  audioButton.className =
    "rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 mr-2";

  audioButton.addEventListener("click", function () {
    if (audioData && audioData.audio) {
      const audio = new Audio(audioData.audio);

      let fallbackUsed = false;

      function playFallback() {
        if (fallbackUsed) return;

        fallbackUsed = true;

        const speech = new SpeechSynthesisUtterance(word.word);
        speech.lang = "en-US";

        window.speechSynthesis.speak(speech);
      }

      audio.addEventListener("error", playFallback);

      audio.play().catch(function () {
        playFallback();
      });
    } else {
      const speech = new SpeechSynthesisUtterance(word.word);
      speech.lang = "en-US";

      window.speechSynthesis.speak(speech);
    }
  });

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Word";

  saveButton.className =
    "rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700";

  saveButton.addEventListener("click", function () {
    const result = saveWord(word);

    if (result) {
      alert("Word saved successfully!");
      displaySavedWords();
      displayStats();
    } else {
      alert("This word is already saved!");
    }
  });

  wordResult.append(heading, phonetic, audioButton, saveButton);

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

function displaySavedWords(words = getSavedWords()) {
  const savedWords = words;

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
    definition.textContent = word.meanings[0].definitions[0].definition;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.setAttribute("data-word", word.word);

    deleteButton.className =
      "rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600";

    card.className = "rounded-xl border border-slate-200 p-4 space-y-3";

    card.append(heading, definition, deleteButton);

    savedContainer.append(card);
  });
}

// Event Delegation
const savedContainer = document.getElementById("saved-words");

savedContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const wordName = event.target.getAttribute("data-word");

    removeWord(wordName);

    const searchText = savedSearch.value.toLowerCase();
    const savedWords = getSavedWords();

    const filteredWords = savedWords.filter(function (word) {
      return word.word.toLowerCase().includes(searchText);
    });

    displaySavedWords(filteredWords);
    displayStats();
  }
});

displaySavedWords();

const savedToggle = document.getElementById("saved-toggle");
const savedContent = document.getElementById("saved-content");
const savedArrow = document.getElementById("saved-arrow");

savedToggle.addEventListener("click", function () {
  savedContent.classList.toggle("hidden");

  if (savedContent.classList.contains("hidden")) {
    savedArrow.classList.remove("fa-chevron-up");
    savedArrow.classList.add("fa-chevron-down");
  } else {
    savedArrow.classList.remove("fa-chevron-down");
    savedArrow.classList.add("fa-chevron-up");
  }
});
