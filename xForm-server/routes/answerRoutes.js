// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

// 提交问卷答案
router.post('/', answerController.submitAnswer);
// 根据 questionId 获取答案
router.get('/:questionId', answerController.getAnswersByQuestionId);
// 根据 questionId 和 componentId 获取答案统计
router.get('/:questionId/:componentId', answerController.getAnswerStats);

module.exports = router;
