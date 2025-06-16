const BookIssue = require('../models/BookIssue');
const Book = require('../models/Book');
const Member = require('../models/Member');
const moment = require('moment');

exports.listIssues = async (req, res) => {
  const issues = await BookIssue.find().lean()
    .populate('book')
    .populate('member');
  res.render('Issues/index', { issues, moment });
};

exports.showIssueForm = async (req, res) => {
  const books = await Book.find({ copiesAvailable: { $gt: 0 } }).lean();
  const members = await Member.find().lean();
  res.render('Issues/add', { books, members });
};

exports.issueBook = async (req, res) => {
  try {
    const { bookId, memberId, dueDate } = req.body;
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(400).send('Invalid book or member');

    if (book.copiesAvailable <= 0) return res.status(400).send('No copies available');

    const issue = new BookIssue({
      book: book._id,
      member: member._id,
      dueDate: new Date(dueDate),
    });

    await issue.save();

    // Update book copies
    book.copiesAvailable -= 1;
    book.copiesIssued += 1;
    await book.save();

    res.redirect('/issues');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const issue = await BookIssue.findById(req.params.id).populate('book');
    if (!issue) return res.status(404).send('Issue record not found');
    if (issue.returnDate) return res.status(400).send('Book already returned');

    issue.returnDate = new Date();
    await issue.save();

    // Update book copies
    const book = issue.book;
    book.copiesAvailable += 1;
    book.copiesIssued -= 1;
    await book.save();

    res.redirect('/Issues');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Admin can reissue book (extend due date)
exports.reissueBook = async (req, res) => {
  try {
    const { extensionDays } = req.body;
    const issue = await BookIssue.findById(req.params.id);
    if (!issue) return res.status(404).send('Issue record not found');
    if (issue.returnDate) return res.status(400).send('Book already returned');

    issue.dueDate = moment(issue.dueDate).add(extensionDays, 'days').toDate();
    await issue.save();

    res.redirect('/Issues');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
