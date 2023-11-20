var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var aboutSchema = new Schema({
    artist_name: String,
    resume: String,
    photo: String,
    email: String,
    id_user_update: String,
    update_date: String
});


module.exports = mongoose.model("about", aboutSchema);