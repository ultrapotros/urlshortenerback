const {model , Schema}   = require("mongoose");

const Urlsdata = new Schema({
    username: {type: String}, //o nombre, o nombre y apellidos??????
    clicksCounter: {type:Number},
    url: {type: String, unique: true, required:true},
    shorturl: {type: String, /* unique: true,  *//* required:true */},
    createdAt: {type: Date, default: Date.now},
})

module.exports = model("Urlsdata", Urlsdata);