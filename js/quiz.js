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
  let answered = false;
  const word = getRandomWord();

  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML = "";

  if (!word) {
    quizContainer.textContent = "Quiz completed ! No more words available.";
    return;
  }

  const definition = document.createElement("p");
  definition.textContent = word.meanings[0].definitions[0].definition;

  const answerInput = document.createElement("input");

  answerInput.type = "text";
  answerInput.placeholder = "Enter your answer";

  answerInput.className =
    "block w-full rounded-lg border border-slate-300 p-3 mt-4";
  const checkButton = document.createElement("button");

  checkButton.textContent = "Check Answer";

  checkButton.className =
    "rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 mt-3";

  const resultMessage = document.createElement("p");

  checkButton.addEventListener("click", function () {
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === "") {
      resultMessage.textContent = "Please enter your answer.";
      resultMessage.className = "mt-3 text-red-500";
      return;
    }
    if (answered) {
      return;
    }

    answered = true;
    checkButton.disabled = true;

    const stats = getQuizStats();

    stats.totalAttempts++;

    if (userAnswer === word.word.toLowerCase()) {
      stats.correctAnswers++;
    }

    saveQuizStats(stats);

    if (userAnswer === word.word.toLowerCase()) {
      resultMessage.textContent = "Correct! Well done!";
      resultMessage.className = "mt-3 font-bold text-green-600";
    } else {
      resultMessage.textContent =
        "Incorrect! The correct answer is " + word.word;
      resultMessage.className = "mt-3 font-bold text-red-500";
    }
  });

  const nextButton = document.createElement("button");

  nextButton.textContent = "Next Question";

  nextButton.className =
    "rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 mt-3";

  nextButton.addEventListener("click", function () {
    displayQuiz();
  });
  quizContainer.append(
    definition,
    answerInput,
    checkButton,
    resultMessage,
    nextButton,
  );
};

displayQuiz();
