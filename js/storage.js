
function getSavedWords() {
  const words = localStorage.getItem("savedWords");

  return words ? JSON.parse(words) : [];
}

function saveWord(word) {
  const savedWords = getSavedWords();

  const alreadySaved = savedWords.find(function (item) {
    return item.word.toLowerCase() === word.word.toLowerCase();
  });

  if (alreadySaved) {
    return false;
  }

  savedWords.push(word);

  localStorage.setItem("savedWords", JSON.stringify(savedWords));

  return true;
}

function removeWord(wordName) {
  const savedWords = getSavedWords();

  const updatedWords = savedWords.filter(function (item) {
    return item.word.toLowerCase() !== wordName.toLowerCase();
  });

  localStorage.setItem("savedWords", JSON.stringify(updatedWords));
}

function getQuizStats() {
  const stats = localStorage.getItem("quizStats");

  return stats
    ? JSON.parse(stats)
    : {
        totalAttempts: 0,
        correctAnswers: 0,
      };
}

function saveQuizStats(stats) {
  localStorage.setItem("quizStats", JSON.stringify(stats));
}
