const dataRepository = require('./dataRepository');
const bookController = require('./controllers/bookController');

// Start the application
dataRepository.loadDataFromFile();
bookController.startCLI();
