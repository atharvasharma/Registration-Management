const passportLocalMongoose =require('passport-local-mongoose');
const mongoose=require('mongoose');

var User = new mongoose.Schema({
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);