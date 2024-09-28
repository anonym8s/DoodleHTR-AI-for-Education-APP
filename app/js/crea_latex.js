/* Genera LaTeX */
document.getElementById('genera_latex').addEventListener('click', async function(e) {
  e.preventDefault();
  
  const prompt = document.getElementById('prompt').value;
  
  try {
    // Show the loading message
    loadingMessage.style.display = 'block';
    
    // Call OpenAI via the exposed API
    const flashcardContent = await window.electronAPI.generateLatex(prompt);
    
    
    // Prompt the user to select where to save the file
    const defaultFileName = `appunti.tex`;
    const filePath = await window.electronAPI.showSaveDialog(defaultFileName);
    
    if (filePath) {
      // Save the flashcards to the chosen file path
      window.electronAPI.saveFlashcards(filePath, flashcardContent);
      console.log(`Latex saved to ${filePath}`);
    } else {
      console.log('Save operation was canceled by the user.');
    }
    
  } catch (error) {
    console.error('Error generating latex:', error);
  } finally {
    // Hide the loading message when the process is done (success or error)
    loadingMessage.style.display = 'none';
  }
});


/* Generate Pdf */ 
document.getElementById('genera_pdf').addEventListener('click', generatePdf);
function generatePdf() {}