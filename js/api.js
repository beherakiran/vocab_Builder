
async function searchWord(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Word not found");
      }

      throw new Error("Something went wrong with the API.");
    }

    const data = await response.json();

    return data[0];

  } catch (error) {
  console.log(error);
  message.textContent = error.message;
}
  }
