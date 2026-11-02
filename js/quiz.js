let usedWords = [];


let getRandomWord = () => {
  let savedWords = getSavedWords();

  if (savedWords.length === 0) {
    return null;
  }

  let remainingWords = savedWords.filter(function (word) {
    return !usedWords.includes(word.word);
  });

  if (remainingWords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * remainingWords.length);

  const selectedWord = remainingWords[randomIndex];

  usedWords.push(selectedWord.word);

  return selectedWord;
};


let displayQuiz = () => {
  const word = getRandomWord();

  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML = "";

  if (!word) {
    quizContainer.textContent = "Quiz completed! No more words available.";
    return;
  }

  const definition = document.createElement("p");
  definition.textContent = word.meanings[0].definitions[0].definition;

  const revealButton = document.createElement("button");
  revealButton.textContent = "Reveal Answer";
  revealButton.className =
    "rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 mt-3";

  const answer = document.createElement("p");
  answer.className = "mt-3 font-bold text-indigo-700";
  answer.classList.add("hidden");

  answer.textContent = "Answer: " + word.word;

  const knewButton = document.createElement("button");
  knewButton.textContent = "I knew it";
  knewButton.className =
    "rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 mt-3 mr-2";
  knewButton.classList.add("hidden");

  const didntKnowButton = document.createElement("button");
  didntKnowButton.textContent = "I didn't";
  didntKnowButton.className =
    "rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 mt-3";
  didntKnowButton.classList.add("hidden");

  revealButton.addEventListener("click", function () {
    answer.classList.remove("hidden");
    knewButton.classList.remove("hidden");
    didntKnowButton.classList.remove("hidden");
    revealButton.disabled = true;
  });

  function recordAnswer(knewTheWord) {
    const stats = getQuizStats();

    stats.totalAttempts++;

    if (knewTheWord) {
      stats.correctAnswers++;
    }

    saveQuizStats(stats);
    displayStats();

    displayQuiz();
  }

  knewButton.addEventListener("click", function () {
    recordAnswer(true);
  });

  didntKnowButton.addEventListener("click", function () {
    recordAnswer(false);
  });

  quizContainer.append(
    definition,
    revealButton,
    answer,
    knewButton,
    didntKnowButton
  );
};

displayQuiz();

