const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const OpenAI = require("openai");
const path = require("path")
require('dotenv').config(); // Loads API key from .env
// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure this environment variable is set
});
const isMac = process.platform === "darwin"

// create the main window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "DoodleHTR",
    width: 1280,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "app", "js", 'preload.js'),
      contextIsolation: true,  // For security, keep this true
      nodeIntegration: false,  // Keep this false for security
      sandbox: false, // Set this to false to ensure `fs` can be used in preload
      enableRemoteModule: false  // Ensure remote is disabled
    }
  });

  // open devtools if in dev env
  // if (isDeveloper) {
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.loadFile(path.join(__dirname, "./app/html/index.html"));
}




app.whenReady().then(() => {
  createMainWindow();

  // implement menu
  // const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu)


  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});




// do not quit on mac
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit()
  }
})










// Handle the OpenAI request for generate flashcards
ipcMain.handle('generate-flashcards', async (event, { prompt, materia, argomento, n }) => {
  const systemPrompt = `
    Sei un utile assistente per lo studio. Devi creare ${n} flashcard
    per aiutare gli studenti a studiare e ripassare gli argomenti
    del prompt di ${materia}. 
    Una flashcard è composta da domanda e risposta e deve essere formattata in JSON.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { "type": "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
});


// Handle save dialog request
ipcMain.handle('save-dialog', async (event, defaultFileName) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Save Flashcards',
    defaultPath: defaultFileName,
    filters: [
      { name: 'CSV Files', extensions: ['csv'] }
    ]
  });

  return filePath; // Return the path where the user wants to save the file
});


// Handle the OpenAI request for latex
ipcMain.handle('generate-latex', async (event, { prompt }) => {
  const systemPrompt = `
    Sei un bravo generatore di codice latex. Adesso ti fornirò i 
    miei appunti, potresti generare un codice latex dettagliato
    di essi. Mi raccomando restituisci in output SOLTANTO il codice
    latex senza altre parole. Non scrivere '\`\`\`latex' o simili,
    sia all'inizio che \`\`\` alla fine.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating latex:', error);
    throw error;
  }
});