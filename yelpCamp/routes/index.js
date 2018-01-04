var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp",function(){
   // mongoose.connection.db.dropDatabase();
});
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);
/*
Campground.create({
    name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
}, function(err, campground){
    if(err)
        console.log("error");
    else {
        console.log(campground);
    }
});
*/
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
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
    var newCampground = {name: name, image: image};
    //campgrounds.push(newCampground);
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
module.exports = router;
