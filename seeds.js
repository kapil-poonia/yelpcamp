var mongoose = require("mongoose");
var Tour = require("./models/tour_schema");
//
function seedDB() {
    Tour.deleteMany({}, function(err) {
        if (err)
            console.log(err);
        console.log("removed tours");
    });
}
module.exports = seedDB;