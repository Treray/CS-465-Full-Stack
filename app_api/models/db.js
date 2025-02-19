const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }), 1000);
};

// Monitor connection events 
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Make initial connection to DB 
connect();

// ✅ Ensure `user.js` is required here
require('./user');  // 🚀 Fix: Ensure correct model file is registered

// ✅ Also require other models 
require('./travlr'); 

module.exports = mongoose;

