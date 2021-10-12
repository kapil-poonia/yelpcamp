var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var Tour = require("./models/tour_schema");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/tourism");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// Tour.create({
//     name: "Munnar",
//     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Scenic_Munnar_Tea_Estate.JPG/300px-Scenic_Munnar_Tea_Estate.JPG",
//     description: "this is a good hill station"
// }, function(err, tour) {
//     if (err)
//         console.log(err);
//     else {
//         console.log("newly created campground");
//         console.log(tour);
//     }
// });

app.get("/", function(req, res) {
    res.render('landing.ejs');
});

// var tour = [
//     { name: "Munnar", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Scenic_Munnar_Tea_Estate.JPG/300px-Scenic_Munnar_Tea_Estate.JPG" },
//     { name: "Pondicherry", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/PNY_airside.jpg/220px-PNY_airside.jpg" },
//     { name: "Dharamshala", image: "https://lh3.googleusercontent.com/wMewyviNg-Bwq45ESsTIsT0MJ49zL0cBdw1HUPDQ4SjzmMNsqTDcQhpt1XCOMANXJzoBX7l-MsNn8XxiL9cozvy6WUTDE7zSDBrzJwzleeJ4fVnb2Di-5FzPv41B-1z_CzL-9Nba7CtD8NB-pddYvjrSWjWokNEQFzmVR66_WBZxhzOnrzQKfy1iy1ZO9GVYv9S37u527SmYS1dfZDaThUNG3KTT6h5VA2boIlx0s8YXhM-X7zZPQXewVWMUgb1b030uWZoC39cPATzbEjmxxsSRpX8DWzBL0mldeAiAVYS5B69r2AqN2LsNc9Goi-FCsZdD6QRo3sGnJd2rhPjGXWZ4-FxxK1OYhdDS8z3TrMC8IyKhQQ2G6lNuKh3BqVZTOMv5pDRFS52oKIk7ehdvi79cTueJbyHufBRqQwaNYlgFvBXzG0mJYuCNMM5S45s2_PXJTy9UMoZH8bHM2UJSJSZoBVdCpnQvSGjbycPKbQxpgPOpSvA46hWatfVoqdAxGN0qBZ-aodyqZ50Gw7GrtzetjRyWo9VWlWzFzDFVxcC65u03nuSnfwBChZKCfiaTLbpmTtWZX_d9wTzRIYaqxfREKokQgdnqatwRz3rrIdSQLgcqg96Ejysl3aWnZud9-XaqWoSY2J5vHFGD5RMN6aUsyUL6Dt9Qb8suL-R146YBeIo9uJGp72wSeOOKRzWv--iebbDYrYMvDvc9fzwlA79_lRkCnjfIH2BVzmZQLZ-fpuyK=w1000-h667-no" }
// ]

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