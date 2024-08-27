const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/:id', questionController.getQuestionById);
router.post('/', questionController.createQuestion);
router.get('/', questionController.getQuestionList);
router.patch('/:id', questionController.updateQuestion);
router.post('/duplicate/:id', questionController.duplicateQuestion);
router.delete('/', questionController.deleteQuestions);

module.exports = router;
