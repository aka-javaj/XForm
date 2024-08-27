// const connectToMongoDB = require('../config/db.js');
// import dbConnect from '../config/mongo.js'
// 从 ES6 的 import 替换为 CommonJS 的 require
// const dbConnect = require('../config/mongo.js');

const Question = require('../models/question');
const { ObjectId } = require('mongodb');

// 获取单个问卷信息connectToMongoDB
exports.getQuestionById = async (req, res) => {
    try {
        // dbConnect.dbConnect();
        console.log(req.params.id)
        const foundDoc1 = await Question.findOne({ id: 'Test Document' });
        console.log(foundDoc1)
        const question = await Question.findById(req.params.id);
        console.log('finish----')
        if (question) {
            res.json({ errno: 0, data: question });
        } else {
            res.json({
                errno: 0,
                data: {
                    id: req.params.id,
                    title: 'title',
                    desc: '问卷描述',
                    js: '',
                    css: '',
                    isDeleted: false,
                    isPublished: true,
                    componentList: getComponentList(),
                }
            });
        }
    } catch (err) {
        console.error(err)
        res.json({ errno: 1002, msg: '错误测试'});
    }
};

// 创建问卷
exports.createQuestion = async (req, res) => {
    try {
        console.log(req.body)
        // const newQuestion = new Question(req.body);
        // await newQuestion.save();
        // 获取当前时间戳
        const objectId = new ObjectId();
        res.json({ errno: 0, data: { id: objectId} });
    } catch (err) {
        // 输出异常信息到控制台
        console.error('创建问卷失败:', err);
        res.status(500).json({ errno: 1002, msg: '创建问卷失败' + err});
    }
};

// 获取问卷列表
exports.getQuestionList = async (req, res) => {
    const { isDeleted, isStar, pageSize = 10 } = req.query;
    try {
        const query = {};
        if (isDeleted) query.isDeleted = isDeleted === 'true';
        if (isStar) query.isStar = isStar === 'true';
        
        const questions = await Question.find(query).limit(parseInt(pageSize));
        const total = await Question.countDocuments(query);

        res.json({ errno: 0, data: { list: questions, total } });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: '获取问卷列表失败' });
    }
};

// 更新问卷
exports.updateQuestion = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(req.params.id, req.body);
        res.json({ errno: 0 });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: '更新问卷失败' });
    }
};

// 复制问卷
exports.duplicateQuestion = async (req, res) => {
    try {
        const originalQuestion = await Question.findById(req.params.id);
        const duplicatedQuestion = new Question({ ...originalQuestion._doc, _id: mongoose.Types.ObjectId() });
        await duplicatedQuestion.save();
        res.json({ errno: 0, data: { id: duplicatedQuestion._id } });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: '复制问卷失败' });
    }
};

// 批量彻底删除
exports.deleteQuestions = async (req, res) => {
    try {
        await Question.deleteMany({ _id: { $in: req.body.ids } });
        res.json({ errno: 0 });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: '删除问卷失败' });
    }
};

function getComponentList() {
    return [
        // Info
        {
            fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
            type: 'questionInfo', // 组件类型，不能重复，前后端统一好
            title: '问卷信息',
            isHidden: false,
            isLocked: false,
            props: { title: '问卷标题', desc: '问卷描述...' }
        },
        // Title
        {
            fe_id: 'c2',
            type: 'questionTitle', // 组件类型，不能重复，前后端统一好
            title: '标题',
            isHidden: false,
            isLocked: false,
            props: { text: '个人信息调研', level: 1, isCenter: false }
        },
        // Input
        {
            fe_id: 'c3',
            type: 'questionInput',
            title: '输入框1',
            isHidden: false,
            isLocked: false,
            props: { title: '你的姓名', placeholder: '请输入姓名...' }
        },
        // Input
        {
            fe_id: 'c4',
            type: 'questionInput',
            title: '输入框2',
            isHidden: false,
            isLocked: false,
            props: { title: '你的电话', placeholder: '请输入电话...' }
        },
        // Textarea
        {
            fe_id: 'c5',
            type: 'questionTextarea',
            title: '多行输入',
            isHidden: false,
            isLocked: false,
            props: { title: '你的爱好', placeholder: '请输入...' }
        },
        // Paragraph
        {
            fe_id: 'c6',
            type: 'questionParagraph',
            title: '段落',
            isHidden: false,
            isLocked: false,
            props: { text: '一行段落1\n一行段落2', isCenter: false }
        },
        // Radio
        {
            fe_id: 'c7',
            type: 'questionRadio',
            title: '单选',
            isHidden: false,
            isLocked: false,
            props: {
                title: '单选标题',
                isVertical: false,
                options: [
                  { value: 'item1', text: '选项1' },
                  { value: 'item2', text: '选项2' },
                  { value: 'item3', text: '选项3' },
                ],
                value: '',
              }
        },
        // Checkbox
        {
            fe_id: 'c8',
            type: 'questionCheckbox',
            title: '多选',
            isHidden: false,
            isLocked: false,
            props: {
                title: '多选标题',
                isVertical: false,
                list: [
                    { value: 'item1', text: '选项1', checked: true },
                    { value: 'item2', text: '选项2', checked: false },
                    { value: 'item3', text: '选项3', checked: false },
                ],
              }
        }
    ]
}