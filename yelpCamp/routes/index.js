var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Campground = require("../models/campground");
var seedDB = require("../seeds");
seedDB();
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
router.get('/', function(req, res, next) {
  console.log("server started...");
  res.render('index');
});

router.get('/campgrounds', function(req, res, next) {
    // res.render('campgrounds', {campgrounds: campgrounds});
    Campground.find({}, function(err, allCampground){
        if(err) console.log(err);
        else
            res.render('campgrounds', {campgrounds: allCampground});
    });
});

router.post('/campgrounds', function (req, res, next){
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
        res.render('new');
});

router.get('/campgrounds/:id', function(req, res, next) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) console.log(err);
        else {
            res.render('show', {campground:foundCampground});
        }
    });
});
module.exports = router;
