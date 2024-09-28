document.getElementById('submitBtn').addEventListener('click', handleFiles);

function handleFiles() {
  const fileInput = document.getElementById('flash');
  const files = fileInput.files;

  if (files.length === 0) {
      alert('No files selected.');
      return;
  }

  let mergedContents = [];

  let fileReadPromises = [];

  for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
          const fileReadPromise = new Promise((resolve, reject) => {
              const reader = new FileReader();

              reader.onload = function(event) {
                  const fileContent = event.target.result;
                  const parsedCsvContent = getCsvContent(fileContent);
                  resolve(parsedCsvContent);
              };

              reader.onerror = function(error) {
                  reject(error);
              };

              reader.readAsText(file);
          });

          fileReadPromises.push(fileReadPromise);
      } else {
          alert(`File ${file.name} is not a CSV file.`);
      }
  }

  Promise.all(fileReadPromises)
      .then((results) => {
          results.forEach((csvData) => {
              mergedContents = mergedContents.concat(csvData);
          });

          mergedContents = shuffleArray(mergedContents);
          // console.log(mergedContents)

          // Store the merged contents in localStorage
          localStorage.setItem('flashcards', JSON.stringify(mergedContents));

          // Navigate to card.html
          window.location.href = 'card.html';
      })
      .catch((error) => {
          console.error("Error reading files:", error);
      });
}



function getCsvContent(csvContent) {
  /*
  * returns csv content (list of tuples question answer) without header
  */
  let rows = csvContent.split("\n").map(row => row.trim()).filter(row => row); // Trim whitespace and filter out empty rows
  rows = rows.slice(1);  // Skip the header

  let content = [];

  rows.forEach((row) => {
      // Use regex to capture the question and answer correctly
      const match = row.match(/^"(.*?)","(.*?)"$/);
      if (match) {
          const question = match[1]; // First capturing group for the question
          const answer = match[2]; // Second capturing group for the answer
          content.push([question, answer]); // Push as an array
      } else {
          console.warn(`Row not in expected format: ${row}`);
      }
  });

  return content;
}



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
