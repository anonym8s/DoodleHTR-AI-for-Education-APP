const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Expose the safe API to the renderer
contextBridge.exposeInMainWorld('electronAPI', {
  saveFlashcards: (filePath, content) => {
    fs.writeFileSync(filePath, content);
  },
  getPath: (folder, fileName) => path.join(folder, fileName),
  generateFlashcards: (prompt, materia, argomento, n) => {
    return ipcRenderer.invoke('generate-flashcards', { prompt, materia, argomento, n });
  },
  showSaveDialog: (defaultFileName) => {
    return ipcRenderer.invoke('save-dialog', defaultFileName);
  },
  generateLatex: (prompt) => {
    return ipcRenderer.invoke("generate-latex", { prompt })
  }
});
