const { mysqlPool } = require('../config/db'); // 引入MySQL连接池

// 获取用户信息
exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.query.id;
        const [results] = await mysqlPool.query('SELECT username, nickname FROM users WHERE id = ?', [userId]);

        if (results.length > 0) {
            res.json({
                errno: 0,
                data: results[0]
            });
        } else {
            res.json({
                errno: 0,
                msg: '用户未找到'
            });
        }
    } catch (err) {
        res.json({ errno: 100, msg: '数据库查询错误' });
    }
};

// 用户注册
exports.registerUser = async (req, res) => {
    try {
        const { username, nickname, password } = req.body;

        const [results] = await mysqlPool.query('SELECT id FROM users WHERE username = ?', [username]);

        if (results.length > 0) {
            return res.json({
                errno: 101,
                msg: '用户已存在'
            });
        }

        await mysqlPool.query('INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)', 
            [username, nickname, password]);

        res.json({ errno: 0 });
    } catch (err) {
        res.json({ errno: 100, msg: '注册失败，数据库错误' });
    }
};

// 用户登录
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [results] = await mysqlPool.query('SELECT * FROM users WHERE username = ? AND password = ?', 
            [username, password]);

        if (results.length > 0) {
            const token = Buffer.from(`${username}:${password}`).toString('base64');
            res.json({
                errno: 0,
                data: { token, results }
            });
        } else {
            res.json({
                errno: 102,
                msg: '用户名或密码错误'
            });
        }
    } catch (err) {
        res.json({ errno: 100, msg: '数据库查询错误' });
    }
};
