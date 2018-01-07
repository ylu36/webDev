var express = require('express'),
    app         = express(),
    bodyParser  = require("body-parser"),
    flash       = require("connect-flash"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require('./models/user'),
    seedDB      = require("./seeds");

var IndexRoute = require('./routes/index'),
    CommentRoute = require('./routes/comments'),
    CampgroundRoute = require('./routes/campgrounds');

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.static(__dirname+"/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once upon a time",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", IndexRoute);
app.use("/campgrounds", CampgroundRoute);
app.use("/campgrounds/:id/comments", CommentRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
