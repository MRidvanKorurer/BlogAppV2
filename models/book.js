const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    baslik:{
        type:String,
        required:true
    },
    altbaşlik:{
        type:String,
        required:true
    },
    aciklama:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Book",bookSchema);