const Book = require('../models/Book');
const dataRepository = require('../dataRepository');

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
  //emitting the save event to dave data to file
  dataRepository.events.emit('save');
}

// Function to update books
function updateBook(id, updatedBook) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = updatedBook;
    dataRepository.events.emit('save');
  }
};

// Function to delete book
function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  dataRepository.events.emit('save');
  console.log('book deleted');
}

module.exports = {
  showBooks,
  addBook,
  updateBook,
  deleteBook
}