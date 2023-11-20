var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    desc: String,
    photo: String,
    id_user_creation: String,
    creation_date: Date,
    id_user_update: String,
    update_date: Date,
    isActive: Boolean
});


module.exports = mongoose.model("posts", postSchema);