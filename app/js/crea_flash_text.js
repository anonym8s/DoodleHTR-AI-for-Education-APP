document.getElementById('prompt_form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const prompt = document.getElementById('prompt').value;
  const subject = document.getElementById('subject').value;
  const argument = document.getElementById('argument').value;
  const number = document.getElementById('number').value;

  try {
    // Show the loading message
    loadingMessage.style.display = 'block';

    // Call OpenAI via the exposed API
    const flashcardContent = await window.electronAPI.generateFlashcards(prompt, subject, argument, number);
    
    // Parse the flashcards JSON returned from OpenAI
    const flashcards = JSON.parse(flashcardContent).flashcards;

    // Construct the CSV content
    const csvContent = 'Domanda,Risposta\n' + flashcards.map(card => {
      const domanda = card.domanda.replace(/"/g, '""'); // Escape quotes
      const risposta = card.risposta.replace(/"/g, '""'); // Escape quotes
      return `"${domanda}","${risposta}"`; // Wrap in quotes
    }).join('\n');

    // Prompt the user to select where to save the file
    const defaultFileName = `${subject}_${argument}.csv`;
    const filePath = await window.electronAPI.showSaveDialog(defaultFileName);

    if (filePath) {
      // Save the flashcards to the chosen file path
      window.electronAPI.saveFlashcards(filePath, csvContent);
      console.log(`Flashcards saved to ${filePath}`);
    } else {
      console.log('Save operation was canceled by the user.');
    }
    
  } catch (error) {
    console.error('Error generating flashcards:', error);
  } finally {
    // Hide the loading message when the process is done (success or error)
    loadingMessage.style.display = 'none';
  }
});
