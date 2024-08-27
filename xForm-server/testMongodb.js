const mongoose = require('mongoose');

// MongoDB 连接字符串
const MONGO_URL = 'mongodb://localhost:27017/xForm'; // 确保替换为你的连接字符串

async function testConnection() {
  try {
    // 连接到 MongoDB
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection successful.');

    // 创建一个简单的测试模型
    const TestSchema = new mongoose.Schema({
      name: String,
    });

    // 定义 Schema
    const questionSchema = new mongoose.Schema({
        title: { type: String, required: false },
        desc: { type: String, default: '问卷描述' }, // 默认值
        js: { type: String, default: '' }, // 默认值
        css: { type: String, default: '' }, // 默认值
        isDeleted: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: true },
        componentList: { type: [mongoose.Schema.Types.Mixed], default: [] } // 使用更通用的数据类型
    });
    const TestModel = mongoose.model('Test', TestSchema);
    // 创建 Model
    const Question = mongoose.model('Question', questionSchema);
    // 插入一条测试数据
    const testDoc = new TestModel({ name: 'Test Document' });
    await testDoc.save();

    console.log('Test document inserted successfully.');

    // 查询刚刚插入的文档
    const foundDoc = await TestModel.findOne({ name: 'Test Document' });
    console.log('Found document:', foundDoc);
    // 查询刚刚插入的文档
    const question = await Question.findById('66cd71c578ad6f25c3e66ef6');
    console.log('Found document111:', question);
    const foundDoc1 = await Question.findOne({ id: 'Test Document' });
    console.log('Found document111:', foundDoc1);
    // 断开连接
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testConnection();
