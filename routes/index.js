var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-React' });
});

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello World!' });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.collection('usercollection');
    collection.find({}).toArray(function(e,docs) {
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.get('/removeuser', function(req, res) {
    var db = req.db;
    var collection = db.collection('usercollection');
    collection.find({}).toArray(function(e,docs) {
        res.render('removeuser', {
            "userlist" : docs
        });
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.collection('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    },
    undefined,
    function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.post('/deleteuser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userNames = req.body.username;
    if (!Array.isArray(userNames)) {
        userNames = [userNames];
    }
    console.log(userNames);

    // Set our collection
    var collection = db.collection('usercollection');

    collection.remove({'username':{'$in':userNames}}, function(err, result) {
        if (err) {
            // If it failed, return error
            console.log("ERROR!");
            res.send("There was a problem removing the information from the database.");
        }
        else {
            // And forward to success page
            console.log("success!");
            res.redirect("removeuser");
        }
     });
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/helloworld', // redirect to the secure profile section
       failureRedirect : '/', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
}));

app.get('/protected', isLoggedIn, function(req, res) {
    res.render('helloworld', { title: 'Hello World!' });
});

return router;
};
