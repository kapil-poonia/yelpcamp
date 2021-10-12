var mongoose = require("mongoose");
//Schema setup
var toursimSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Tour = mongoose.model("Tour", toursimSchema);
module.exports = Tour;