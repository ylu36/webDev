var mongoose = require('mongoose');
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}, {usePushEach: true});

/*
Campground.create({
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
    description: "this is a campground"
}, function(err, campground){
    if(err)
        console.log("error");
    else {
        console.log(campground);
    }
});
*/
module.exports = mongoose.model("Campground", campgroundSchema);