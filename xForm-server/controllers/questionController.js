
const Question = require('../models/question');
const { ObjectId } = require('mongodb');

// 获取单个Survey InformationconnectToMongoDB
exports.getQuestionById = async (req, res) => {
    try {
        console.log(req.params.id)
        const question = await Question.findById(req.params.id).lean();
        if (question) {
            question.id = question._id; // 将 _id 映射到 id 字段
            res.json({ errno: 0, data: question });
        } else {
            res.json({
                errno: 0,
                data: {
                    id: req.params.id,
                    title: 'title',
                    desc: 'desc',
                    userId: 1,
                    js: '',
                    css: '',
                    isDeleted: false,
                    isPublished: true,
                    isStar: false,
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

// update or insert question
exports.updateQuestion = async (req, res) => {
    try {
        await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return更新后的文档
                upsert: true // 如果找不到文档则创建一个新文档
            }
            );
        
        res.json({ errno: 0 });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: '更新问卷失败' });
    }
};

// Copy问卷
exports.duplicateQuestion = async (req, res) => {
    try {
        const originalQuestion = await Question.findById(req.params.id);
        const duplicatedQuestion = new Question({ ...originalQuestion._doc, _id: mongoose.Types.ObjectId() });
        await duplicatedQuestion.save();
        res.json({ errno: 0, data: { id: duplicatedQuestion._id } });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: 'Copy问卷失败' });
    }
};

// 批量彻底Delete
exports.deleteQuestions = async (req, res) => {
    try {
        await Question.deleteMany({ _id: { $in: req.body.ids } });
        res.json({ errno: 0 });
    } catch (err) {
        res.status(500).json({ errno: 1002, msg: 'Delete问卷失败' });
    }
};

function getComponentList() {
    return [
        // Info
        {
            fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
            type: 'questionInfo', // 组件类型，不能重复，前后端统一好
            title: 'the survey information',
            isHidden: false,
            isLocked: false,
            props: { title: 'Survey Title', desc: 'Description...' }
        },
        // Title
        {
            fe_id: 'c2',
            type: 'questionTitle', // 组件类型，不能重复，前后端统一好
            title: 'Title',
            isHidden: false,
            isLocked: false,
            props: { text: 'Information', level: 1, isCenter: false }
        },
        // Input
        {
            fe_id: 'c3',
            type: 'questionInput',
            title: 'Input field 1',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your Name', placeholder: 'Please enter your name...' }
        },
        // Input
        {
            fe_id: 'c4',
            type: 'questionInput',
            title: 'Input field 2',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your phone', placeholder: 'Please enter your phone...' }
        },
        // Textarea
        {
            fe_id: 'c5',
            type: 'questionTextarea',
            title: 'Input field ',
            isHidden: false,
            isLocked: false,
            props: { title: 'Your hobbies', placeholder: 'Please enter your hobbies...' }
        },
        // Paragraph
        {
            fe_id: 'c6',
            type: 'questionParagraph',
            title: 'Text',
            isHidden: false,
            isLocked: false,
            props: { text: 'Paragraph1\nParagraph2', isCenter: false }
        },
        // Radio
        {
            fe_id: 'c7',
            type: 'questionRadio',
            title: 'Single-choice',
            isHidden: false,
            isLocked: false,
            props: {
                title: 'Single-choice Title',
                isVertical: false,
                options: [
                  { value: 'item1', text: 'A' },
                  { value: 'item2', text: 'B' },
                  { value: 'item3', text: 'C' },
                ],
                value: '',
              }
        },
        // Checkbox
        {
            fe_id: 'c8',
            type: 'questionCheckbox',
            title: 'Multiple-choice',
            isHidden: false,
            isLocked: false,
            props: {
                title: 'Multiple-choice Title',
                isVertical: false,
                list: [
                    { value: 'item1', text: 'A', checked: true },
                    { value: 'item2', text: 'B', checked: false },
                    { value: 'item3', text: 'C', checked: false },
                ],
              }
        }
    ]
}