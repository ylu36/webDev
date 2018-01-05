var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var seedDB = require("../seeds");
seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp",function(){
    //mongoose.connection.db.dropDatabase();
});

var campgrounds = [

    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];

/* GET home page. */
router.get('/', function(req, res) {
  console.log("server started...");
  res.render('index');
});

router.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampground){
        if(err) console.log(err);
        else
            res.render('campgrounds/campgrounds', {campgrounds: allCampground});
    });
});

router.post('/campgrounds', function (req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) console.log(err);
        else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/campgrounds/new', function(req, res, next) {
        res.render('campgrounds/new');
});

router.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) console.log(err);
        else {
            res.render('campgrounds/show', {campground:foundCampground});
        }
    });
});

//comment route
router.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment); console.log("comment is " + comment);
                    campground.save(); //console.log("campground is " + campground.comments[0].author + "..." + campground.comments[1].author);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});
module.exports = router;
