const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    baslik:{
        type:String,
        required:true
    },
    altbaslik:{
        type:String,
        required:true
    },
    aciklama:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Book",bookSchema);