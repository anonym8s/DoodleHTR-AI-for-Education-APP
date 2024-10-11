<img src="app/images/banner/banner.jpg">

# **DoodleHTR**

**AI powered Education** - An Electron-based app designed to enhance your study methods with the help of artificial intelligence.

## *Description*

DoodleHTR is an app that helps you transform your notes into interactive and organized study tools. Using AI, it generates flashcards and LaTeX files from plain text or images of your notes. Perfect for students and educators, DoodleHTR simplifies the study process and makes it easy to create academic materials.

## *Features*

### *1. Flashcard Creation*
- Input text or upload images of your notes.
- The app automatically generates flashcards to help you study more efficiently.

### *2. Interactive Flashcard Study Mode*
- Use the flashcards in an interactive interface designed to aid revision.
- Easily review and memorize key concepts.

### *3. LaTeX File Creation*
- Convert your notes (text or images) into well-structured PDF files using LaTeX.
- You can also obtain the raw LaTeX code to further customize the output.

### *Coming soon:*
- HTR/OCR recognition of your notes
- English language
- LaTeX compiling

## *Warning*
For now the APP is only optimized for the italian language 🇮🇹.

## *How to Start*
- clone this repository
- create a .env file with your OpenAI Key (Example: `OPENAI_API_KEY = "sk-your-openai-key"`)
- put the .env file in the same folder as `main.js`
- install the requirements in node:
  `npm install dotenv`
  `npm install openai`
  `npm install electron`
- open main folder with your IDE and type in the terminal `npm start`

## *How to Use features*

### *Create Flashcards*
- From the home page click on `crea flashcard`
- Click on `crea flashcard da testo`
- Type in your prompt (notes), subject and argument
- Click on `crea`
- Download csv file with the flashcard
- Now share your flashards if you want, or keep it for yoursself to exercitate.

### *Exercise with Flashcards*
- From the home page click on `esercitazioni flashcard`
- Upload multiple csv files with your generated flashcards
- Click on `esercitati`
- Now you can click on the flashcard to reveal the answer, or navigate through the flashcards with previous or next buttons.

### *Generate LaTeX*
- From the home page click on `crea documento latex`
- Click on `crea latex da testo`
- Type in your prompt (notes)
- Click on `crea`
- Download txt file with your LaTeX code.
