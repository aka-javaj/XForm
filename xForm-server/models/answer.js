// models/answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    // answers: { type: Map, of: String }, // 用户的答案，以键值对形式存储，键为组件ID  换一种方式
    // 将 answers 定义为数组，其中包含 componentId 和 value
    answers: [
        {
            componentId: { type: String, required: true },  // 每个答案的组件ID
            value: { type: String, required: false }         // 每个答案的值
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
