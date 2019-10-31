var mongoose = require("mongoose");


var contactSchema = new mongoose.Schema({
    email: String,
    phone: String,
    message: String,
    contactType: String,
    license: String,
    created: {type: Date, default: Date.now},
    contacted: String
    
});

module.exports = mongoose.model("Contact", contactSchema);