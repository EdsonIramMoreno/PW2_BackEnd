var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var social_mediaSchema = new Schema({
    name: String,
    url: String,
    icon: String,
    id_user_creation: String,
    creation_date: Date,
    id_user_update: String,
    update_date: Date,
    isActive: Boolean
});


module.exports = mongoose.model("social_media", social_mediaSchema);