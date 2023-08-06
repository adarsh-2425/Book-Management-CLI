// defining class for books
class Book {
  constructor(title, author, genre, publishedYear) {
    this.id = null;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publishedYear = publishedYear;
  }
};

module.exports = Book;