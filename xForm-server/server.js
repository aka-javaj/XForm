const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes.js');
const userRoutes = require('./routes/userRoutes');
// const { mysqlPool, mongoDb } = require('./config/db'); // 引入MySQL和MongoDB的配置
const connectToMongoDB = require('./config/mongo.js');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // 允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 使用路由
app.use('/api/question', questionRoutes);
app.use('/api/user', userRoutes);

// 在应用启动时连接数据库
connectToMongoDB().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

// 处理404错误
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route doesn\'t exist.');
});

// 处理500错误
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

