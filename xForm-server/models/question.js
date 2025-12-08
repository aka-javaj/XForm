const mongoose = require('mongoose');

// 定义 Schema
const questionSchema = new mongoose.Schema({
    userid: {type: Number, required: false },
    title: { type: String, required: false },
    desc: { type: String, default: 'desc' }, // 默认值
    js: { type: String, default: '' }, // 默认值
    css: { type: String, default: '' }, // 默认值
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    isStar: { type: Boolean, default: false },
    componentList: { type: [mongoose.Schema.Types.Mixed], default: [] } // 使用更通用的数据类型
});

// 创建 Model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
