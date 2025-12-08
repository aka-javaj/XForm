// controllers/answerController.js
const Answer = require('../models/answer');
const mongoose = require('mongoose'); // 引入 mongoose
// 提交问卷答案
exports.submitAnswer = async (req, res) => {
    try {
        const { questionId, answerList } = req.body;
        // console.log("==========")
        // console.log(req.body)
        if (!questionId) {
            return res.status(400).json({ errno: 1003, msg: '缺少问卷ID' });
        }
        // 定义需要替换的值
        const valueMapping = {
            'item1': 'A',
            'item2': 'B',
            'item3': 'C',
            'item4': 'D',
            'item5': 'E',
            'item6': 'F'
        };

        // 遍历 answerList 并替换 value
        const updatedAnswers = answerList.map(answer => {
            const updatedValue = answer.value
                .split(',')  // 将逗号分隔的字符串拆成数组
                .map(item => valueMapping[item.trim()] || item.trim()) // 替换数组中的每个值
                .join(',');  // 将数组重新拼接成字符串
            
            return {
                ...answer,
                value: updatedValue
            };
        });
        // 保存用户的答案
        const newAnswer = new Answer({
            questionId,
            answers : updatedAnswers
        });

        await newAnswer.save();
        
        res.json({ errno: 0, msg: 'Submission successful' });
    } catch (err) {
        console.error('提交问卷答案失败:', err);
        res.status(500).json({ errno: 1002, msg: 'Submission failed' });
    }
};
// 根据 questionId 查询答案
exports.getAnswersByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.params;

        // 查询对应 questionId 的所有答案
        const answers = await Answer.find({ questionId });

        // 将答案格式化为所需的结构
        const formattedAnswers = answers.map(answer => {
            // 将答案中的 componentId 转换为想要的格式
            const formattedAnswer = { _id: answer._id.toString() };

            // 遍历答案数组，将 componentId 作为键，value 作为值
            answer.answers.forEach(({ componentId, value }) => {
                formattedAnswer[componentId] = value;
            });

            return formattedAnswer;
        });

        res.json({
            errno: 0,
            data: {
                total: formattedAnswers.length,
                list: formattedAnswers
            }
        });
    } catch (err) {
        console.error('查询答案失败:', err);
        res.status(500).json({ errno: 1002, msg: '查询答案失败' });
    }
};
exports.getAnswerStats = async (req, res) => {
    try {
        const { questionId, componentId } = req.params;

        // 检查参数是否存在
        if (!questionId || !componentId) {
            return res.status(400).json({ errno: 1003, msg: '缺少问卷ID或组件ID' });
        }

        // 检查 questionId 是否是有效的 ObjectId
        if (!mongoose.isValidObjectId(questionId)) {
            return res.status(400).json({ errno: 1003, msg: '无效的问卷ID' });
        }

        // 使用聚合管道查询和统计
        const ObjectId = mongoose.Types.ObjectId; // 引入 ObjectId
        const id = new ObjectId(questionId);
        const results = await Answer.aggregate([
            { 
                // 过滤出符合 questionId 的文档
                
                $match: { questionId: id }
            },
            { 
                // 将 answers 数组中的每个元素展开
                $unwind: '$answers' 
            },
            { 
                // 过滤出符合 componentId 的答案
                $match: { 'answers.componentId': componentId }
            },
            { 
                // 根据答案的 value 进行分组，统计每个 value 的数量
                $group: {
                    _id: '$answers.value', // 按答案 value 分组
                    count: { $sum: 1 } // 计算每个 value 出现的次数
                }
            },
            { 
                // 将 _id 字段重命名为 name，以符合返回数据格式
                $project: {
                    _id: 0,
                    name: '$_id', 
                    count: 1
                }
            }
        ]);

        // 调试输出
        console.log('Results:', results);

        // 返回统计结果
        res.json({ errno: 0, data: { stat: results } });
    } catch (err) {
        console.error('查询答案统计失败:', err);
        res.status(500).json({ errno: 1002, msg: '查询答案统计失败' });
    }
};