var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var visitsSchema = new Schema({
    name: String,
    count: Int32Array
});


module.exports = mongoose.model("visits", visitsSchema);