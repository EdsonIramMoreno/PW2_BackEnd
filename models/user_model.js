var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    pwd: String,
    isActive: Boolean
});


module.exports = mongoose.model("users", userSchema);