const dataRepository = require('./dataRepository');
const bookController = require('./controllers/bookController');

// Load the data from the file when the pplication starts
dataRepository.loadDataFromFile();


//bookController.addBook('Lol6', 'lol happens', 'hmm', 2000)
const book = {
  id: 5,
  title: 'lolupdate',
  author: 'update',
  genre: 'update',
  publishedYear: 1000
  
}
//bookController.updateBook(5, book);
bookController.showBooks();