var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tourism");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Schema setup
var toursimSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Tour = mongoose.model("Tour", toursimSchema);


app.get("/", function(req, res) {
    res.render('landing.ejs');
});


// show all tours
app.get("/tourism", function(req, res) {
    //get all tours from database
    Tour.find({}, function(err, allTours) {
        if (err)
            console.log(err);
        else
            res.render('index.ejs', { tour: allTours });
    });
});

// CREATE - add new tour
app.post("/tourism", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newtour = { name: name, image: image, description: desc };
    //create a new tour and save to db
    Tour.create(newtour, function(err, newlycreated) {
        if (err)
            console.log(err);
        else
            res.redirect("/tourism");
    });
});

//NEW- form to create new tour
app.get("/tourism/new", function(req, res) {
    res.render('new.ejs');
});


//SHOW - shows more info about one tour
app.get("/tourism/:id", function(req, res) {
    //find the tour with provided id
    Tour.findById(req.params.id, function(err, foundtour) {
        if (err)
            console.log(err);
        else
        //render show template with that tour  
            res.render('show.ejs', { tour: foundtour });
    });
});

app.listen(3000, function() {
    console.log("server started");
});
