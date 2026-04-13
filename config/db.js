const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_practical_custom';
        await mongoose.connect(uri);
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDatabase;
