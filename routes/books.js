const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.listBooks);
router.get('/add', bookController.showAddBookForm);
router.post('/add', bookController.addBook);
router.get('/edit/:id', bookController.showEditBookForm);
router.put('/edit/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;
