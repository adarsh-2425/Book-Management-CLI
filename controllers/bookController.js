const readline = require('readline');
const Book = require('../models/Book');
const dataRepository = require('../dataRepository');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Function to show books
function showBooks() {
  if (books.length === 0) {
    console.warn('No books found. Add a new book.');
  } else {
    console.log(books);
  }
};


// Function to add a new book
function addBook(callback) {
  rl.question('Enter the title: ', title => {
    rl.question('Enter the author: ', author => {
      rl.question('Enter the genre: ', genre => {
        rl.question('Enter the published year: ', publishedYear => {
          const newBook = new Book(title, author, genre, parseInt(publishedYear));
          newBook.id = books.length + 1; // Assign the next available ID based on the array length
          books.push(newBook);
          console.log('Book collection saved to file');
          
          dataRepository.events.emit('save');

          callback(); // Call the callback function to continue the loop
        });
      });
    });
  });
}

// Function to update books
function updateBook(callback) {
  rl.question('Enter id: ', id => {
    rl.question('Enter the Title: ', title => {
      rl.question('Enter the Authors Name: ', author => {
        rl.question('Enter the Genre: ', genre => {
          rl.question('Enter the Published year: ', publishedYear => {
            const updatedBook = new Book(title, author, genre, parseInt(publishedYear));
            const index = books.findIndex(book => book.id === parseInt(id));
            if (index !== -1) {
              books[index] = updatedBook;
              dataRepository.events.emit('save');
              console.log('Book updated successfully.');
            } else {
              console.warn('Book not found.');
            }

            callback(); // Call the callback function to continue the loop
          });
        });
      });
    });
  });
}




// Function to delete book
function deleteBook(callback) {
  rl.question('Enter id of book to delete: ', id => {
    books = books.filter(book => book.id !== parseInt(id));
  dataRepository.events.emit('save');
  console.log('book deleted');

  callback(); // Call the callback function to continue the loop
  })
}

// Usage
function startCLI() {
  rl.question('Enter Command (show / add / update / delete / exit ): ', command => {
    switch (command) {
      case 'show':
        showBooks();
        break;
      case 'add':
        addBook(() => {
          startCLI(); // Call startCLI() after addBook() is completed
        });
        break;
      case 'update':
        updateBook(() => {
          startCLI(); // Call startCLI() after addBook() is completed
        });
        break;
      case 'delete':
        deleteBook(() => {
          startCLI(); // Call startCLI() after addBook() is completed
        });
        break;
      case 'exit':
        rl.close();
        break;
      default: 
        console.log('Invalid Command');
        break;
    }
    
    // Continue the loop until the user enters 'exit'
    if (command !== 'exit') {
      startCLI();
    }
  })
}

module.exports = {
  startCLI
}