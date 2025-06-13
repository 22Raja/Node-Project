const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

router.get('/', issueController.listIssues);
router.get('/add', issueController.showIssueForm);
router.post('/add', issueController.issueBook);
router.put('/return/:id', issueController.returnBook);
router.put('/reissue/:id', issueController.reissueBook);

module.exports = router;
