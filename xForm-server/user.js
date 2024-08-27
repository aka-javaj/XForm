const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');  // 引入CORS中间件
// 使用CORS中间件
app.use(cors({
    origin: 'http://localhost:8000',  // 允许访问的前端URL
    methods: ['GET', 'POST'],         // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'] // 允许的请求头
}));
// 使用body-parser中间件来解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 创建MySQL连接池
const pool = mysql.createPool({
    host: 'localhost',   // MySQL服务器主机名
    user: 'root',        // MySQL用户名
    password: 'Xu123456+',  // MySQL密码
    database: 'xForm',  // MySQL数据库名
});

// 获取用户信息
app.get('/api/user/info', (req, res) => {
    // 假设已登录用户的ID从请求中获取，或者通过其他方式获取
    const userId = req.query.id;

    pool.query('SELECT username, nickname FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.json({ errno: 100, msg: '数据库查询错误' });
        }

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
    });
});

// 用户注册
app.post('/api/user/register', (req, res) => {
    const { username, nickname, password } = req.body;

    // 检查用户是否已经存在
    pool.query('SELECT id FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            return res.json({ errno: 100, msg: '数据库查询错误' });
        }

        if (results.length > 0) {
            return res.json({
                errno: 101,
                msg: '用户已存在'
            });
        }

        // 插入新用户
        pool.query('INSERT INTO users (username, nickname, password) VALUES (?, ?, ?)', 
            [username, nickname, password], (err, results) => {
            if (err) {
                return res.json({ errno: 100, msg: '注册失败，数据库错误' });
            }

            res.json({ errno: 0 });
        });
    });
});

// 用户登录
app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;

    // 验证用户信息
    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', 
        [username, password], (err, results) => {
        if (err) {
            return res.json({ errno: 100, msg: '数据库查询错误' });
        }

        if (results.length > 0) {
            // 模拟生成一个token
            const token = Buffer.from(`${username}:${password}`).toString('base64');
            // const nickname 
            res.json({
                errno: 0,
                data: { token,
                    results
                }
            });
        } else {
            res.json({
                errno: 102,
                msg: '用户名或密码错误'
            });
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
