const mongoose=require('mongoose');

var entrySchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    registrationType:{
        type:String,
        required:true
    },
    numberOfTickets:{
        type:Number,
        required:true
    },
    idImage:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

var Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;