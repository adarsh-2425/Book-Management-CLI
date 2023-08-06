const fs = require('fs');
const EventEmitter = require('events');

const events = new EventEmitter;

const booksFile = './books.json';
// Define the global array variable to store book data
books = [];

// Function to read data from 'books.json' file
function loadDataFromFile() {
  try {
    const data = fs.readFileSync(booksFile, 'utf-8');
    books = JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, it means no books yet, so initialize the 'books' array as empty
      books = [];
    } else {
      console.error(err.message);
    }
  }
};

// Function to save 'books' array back to 'books.json' file
function saveDataToFile() {
  try {
    const jsonData = JSON.stringify(books, null, 2);
    fs.writeFileSync(booksFile, jsonData, 'utf-8');
    console.log('Book collection saved to file');
  } catch (err) {
    console.error('Error saving books');
  }
};

events.on('save', () => {
  saveDataToFile();
})

module.exports = {
  loadDataFromFile,
  saveDataToFile,
  events
};
