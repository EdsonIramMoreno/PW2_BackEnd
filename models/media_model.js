var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mediaSchema = new Schema({
    title: String,
    url: String,
    id_user_creation: String,
    creation_date: Date,
    id_user_update: String,
    update_date: Date,
    isActive: Boolean
});


module.exports = mongoose.model("media", mediaSchema);