const fs = require('fs');
const booksFile = 'books.json';

//Book Class
class Book {
  constructor(title, author, genre, publishedYear) {
    this.id = null;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publishedYear = publishedYear;
  }
};

//books array
let books = [];

// Function to read data from 'books.json' file
function readDataFromFile() {
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
}

// Function to save 'books' array back to 'books.json' file
function saveBooksToFile() {
  try {
    const jsonData = JSON.stringify(books, null, 2);
    fs.writeFileSync(booksFile, jsonData, 'utf-8');
    console.log('Book collection saved to file');
  } catch (err) {
    console.error('Error saving books');
  }
};

// Function to show books
function showBooks() {
  if (books.length === 0) {
    console.warn('No books found. Add a new book.');
  } else {
    console.log(books);
  }
}

// Function to add a new book
function addBook(title, author, genre, publishedYear) {
  const newBook = new Book(title, author, genre, publishedYear);
  newBook.id = books.length + 1; // Assign the next available ID based on the array length
  books.push(newBook);
  saveBooksToFile(); // Save the updated 'books' array to file
}

// Function to update books
function updateBook(id, updatedBook) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = updatedBook;
  }
}

// Read existing data from the file when the application starts
readDataFromFile();

// Example usage
//addBook('oopsjeevitham', 'Benyamin', 'non-fiction');
const updatedBook = {
  id: 2, // Replace with the actual ID of the book you want to update
  title: 'Oh no',
  author: 'Updated Book Author',
  genre: 'Updated Book Genre',
  publishedYear: 2023 // Updated Published Year
};

updateBook(2, updatedBook);

showBooks();
