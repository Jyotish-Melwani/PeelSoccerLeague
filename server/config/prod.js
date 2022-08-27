const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/instock')
// mongoose.connect('mongodb+srv://Khalidmhd:khalidmhd21@desserts.wp1cixq.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Database Connected")
});
module.exports = db