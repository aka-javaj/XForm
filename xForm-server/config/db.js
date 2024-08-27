const mysql = require('mysql2');
// MySQL 配置
const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Xu123456+',
    database: 'xForm',
}).promise(); // 添加 promise() 支持

// 导出 MySQL 连接
module.exports = {
    mysqlPool,
    // connectToMongoDB
};
