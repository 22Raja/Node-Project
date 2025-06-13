const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/', memberController.listMembers);
router.get('/add', memberController.showAddMemberForm);
router.post('/add', memberController.addMember);
router.get('/edit/:id', memberController.showEditMemberForm);
router.put('/edit/:id', memberController.updateMember);

// Admin extend membership
router.put('/extend/:id', memberController.extendMembership);

// Delete member
router.delete('/delete/:id', memberController.deleteMember);

module.exports = router;
