function displayStats(){
    const savedWords = getSavedWords();
    const stats = getQuizStats();

    const totalWords = savedWords.length;
    const totalAttempts = stats.totalAttempts;
    const correctAnswers = stats.correctAnswers;

    let accuracy = 0;
    if (totalAttempts > 0) {
        accuracy = Math.round((correctAnswers / totalAttempts) * 100);
    }

     const statsContainer = document.getElementById("stats-container");

       statsContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="rounded-xl bg-indigo-50 p-5">
        <p class="text-sm text-indigo-600">Words Saved</p>
        <h3 class="mt-2 text-3xl font-bold">${totalWords}</h3>
      </div>

      <div class="rounded-xl bg-amber-50 p-5">
        <p class="text-sm text-amber-600">Quiz Attempts</p>
        <h3 class="mt-2 text-3xl font-bold">${totalAttempts}</h3>
      </div>

      <div class="rounded-xl bg-green-50 p-5">
        <p class="text-sm text-green-600">Correct Answers</p>
        <h3 class="mt-2 text-3xl font-bold">${correctAnswers}</h3>
      </div>

      <div class="rounded-xl bg-purple-50 p-5">
        <p class="text-sm text-purple-600">Accuracy</p>
        <h3 class="mt-2 text-3xl font-bold">${accuracy}%</h3>
      </div>

    </div>
  `;
}

displayStats();