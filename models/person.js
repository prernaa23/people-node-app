const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    mobileNumber: String,
});

module.exports = mongoose.model("Person", PersonSchema);
