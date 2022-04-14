const {model , Schema}   = require("mongoose");

const User= new Schema({
    username: {type: String},
    premium:  {type:Boolean},
    email: {type: String},
    password: {type: String}
})

module.exports = model("Userdata", User);