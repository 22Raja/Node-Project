const Book = require('../models/Book');

exports.listBooks = async (req, res) => {
  const books = await Book.find().lean();
  res.render('books/index', { books });
};

exports.showAddBookForm = (req, res) => {
  res.render('books/add');
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;
    const book = new Book({
      title,
      author,
      totalCopies,
      copiesAvailable: totalCopies,
      copiesIssued: 0
    });
    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.showEditBookForm = async (req, res) => {
  const book = await Book.findById(req.params.id).lean();
  console.log(book)
  if (!book) return res.status(404).send('Book not found');
  res.render('books/edit', { book });
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;

    // Make sure totalCopies is a number (because form input is string)
    const totalCopiesNum = parseInt(totalCopies, 10);

    // Find the book as a Mongoose document (no .lean())
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    // Calculate difference
    const diff = totalCopiesNum - book.totalCopies;

    book.title = title;
    book.author = author;
    book.totalCopies = totalCopiesNum;
    book.copiesAvailable += diff;

    if (book.copiesAvailable < 0) {
      return res.status(400).send('Copies available cannot be negative');
    }

    await book.save();
    res.redirect('/books');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
};
