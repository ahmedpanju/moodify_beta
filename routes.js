var Journal            = require('./models/journal');
var User               = require('./models/user');
var moment             = require('moment');
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            title: 'Moodify - Mood Tracking Made Ridiculously Easy',
            style: 'index.css',
            logic: 'index.js'
        }); 
    });
    
    app.get('/plans', function(req, res) {
        res.render('plans.ejs', {
            title: 'Moodify - Proffesionals',
            style: 'plans.css',
            logic: 'plans.js'
        }); 
    });

    app.get('/login', function(req, res) {

        res.render('login.ejs', { 
                message: req.flash('loginMessage') ,
                title: 'Moodify - Login',
                style: 'login.css',
                logic: 'login.js'
            });
        }); 
    
    app.get('/contact', function(req, res) {
        res.render('contact.ejs', {
            title: 'Moodify - Contact',
            style: 'contact.css',
            logic: 'contact.js'
        })    
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login',
        failureFlash : true 
    }));

    app.get('/signup', function(req, res) {
        complete = false;
        res.render('signup.ejs', { 
                message: req.flash('signupMessage') ,
                title: 'Moodify - Signup',
                style: 'signup.css',
                logic: 'signup.js',
                complete: complete
            });
        });
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));
    
    app.post('/complete', function(req, res){
        var user = req.user;
        var update = true;
        var sleep = req.body.sleep;
        var diet = req.body.diet;
        var exercise = req.body.exercise;
        var mood = req.body.mood;
        var happiness = req.body.happiness;
        var sadness = req.body.sadness;
        var options = ["sleep", "diet", "exercise", "mood", "happiness", "sadness"];
        var user_options = [];
        var journal_content = [];
        var empty = true;
        var array = [[[]]];
        journal_content.push(sleep);
        journal_content.push(diet);
        journal_content.push(exercise);
        journal_content.push(mood);
        journal_content.push(happiness);
        journal_content.push(sadness);
        
        for (var i = 0; i < options.length; i++) {
            if(journal_content[i] == "true"){
                user_options.push(options[i]);                              
            }
        }
        
        User.findByIdAndUpdate(user._id, {'local.user_options' : user_options}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.data' : array}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.date_data' : array}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.empty' : empty}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.journal_content' : journal_content}, {new: true}, function(err, docs){
            if(err) throw err;
           
        });
        User.findByIdAndUpdate(user._id, {'local.complete' : update}, {new: true}, function(err, docs){
            if(err) throw err;
            var user = req.user;
            res.redirect('/profile');
        });
      
    });
    
    app.get('/profile', isLoggedIn, function(req, res) {
        var user  = req.user;
        var journal = user.local.journal_content;
        var options = ["sleep", "diet", "exercise", "mood", "happiness", "sadness"];
        var array = [[[]]];
        var empty = true;
        var journal_content = ["true", "true", "true", "true", "true", "true"];
    
         User.findByIdAndUpdate(user._id, {'local.user_options' : options}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.data' : array}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.date_data' : array}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
    
        
        User.findByIdAndUpdate(user._id, {'local.journal_content' : journal_content}, {new: true}, function(err, docs){
            if(err) throw err;
           
        });
        
             res.render('profile.ejs', {
                user : req.user, 
                title: 'Moodify - Dashboard',
                style: 'profile.css',
                logic: 'profile.js',
                moment: moment
            }); 
    });
    
    
    app.post('/journal',  function(req, res) {
        var user = req.user;
        var sleep = req.body.sleep;
        var diet = req.body.diet;
        var exercise = req.body.exercise;
        var mood = req.body.mood;
        var happiness = req.body.happiness;
        var sadness = req.body.sadness;
        var date = new Date();
        var full = false;
        var complete = true;
        var incomplete = false;
        var amount = 1;
        var time = 10;
        var value;
        
         User.findByIdAndUpdate(user._id, {'local.empty' : full}, {new: true}, function(err, docs){
            if(err) throw err;
            
        });
        
        User.findByIdAndUpdate(user._id, {'local.journal_complete' : complete}, {new: true}, function(err, docs){
                    if(err) throw err;
                });
        
            var newJournal = Journal({
                user: user.local.email,
                date: date,
                sleep: sleep,   
                diet: diet,
                exercise: exercise,
                mood: mood,
                happiness: happiness,
                sadness: sadness
        });
        
        Journal.createJournal(newJournal, function(err, journal){
            if(err) throw err;
            console.log(journal);
            res.redirect('/profile');
        });
                                     
    });
    
    
    app.get('/stats', isLoggedIn, function(req, res) {
        var user = req.user;
        
        
        if (user.local.empty == false) {
            
              Journal.find({user: user.local.email}, function(err, docs){
            if(err) throw err;
            for (var i = 0; i < docs.length; i++) {
                user.local.stats.push(docs[i]);
            };
                      
            var panel_length = Math.ceil(user.local.stats.length / 5);
            
            var sleep_container = [];
            var diet_container = [];
            var exercise_container = [];
            var mood_container = [];
            var happiness_container = [];
            var sadness_container = [];
            var date_container = [];
            
                for (var i = 0; i < user.local.stats.length; ++i) {
                    sleep_container.push(user.local.stats[i].sleep);
                    diet_container.push(user.local.stats[i].diet);
                    exercise_container.push(user.local.stats[i].exercise);
                    mood_container.push(user.local.stats[i].mood);
                    happiness_container.push(user.local.stats[i].happiness);
                    sadness_container.push(user.local.stats[i].sadness);
                    date_container.push(moment(user.local.stats[i].date).format('MMM - DD'));
                }
                
            var sleep_panel = [];
            var diet_panel = [];
            var exercise_panel = [];
            var mood_panel = [];
            var happiness_panel = [];
            var sadness_panel = [];
            var date_panel = [];     
                   
            var start = 0;
            var end = 5;
                  
             for (var i = 0; i < panel_length; i++) {
                sleep_panel.push(sleep_container.slice(start, end));
                diet_panel.push(diet_container.slice(start, end));
                exercise_panel.push(exercise_container.slice(start, end));
                mood_panel.push(mood_container.slice(start, end));
                happiness_panel.push(happiness_container.slice(start, end));
                sadness_panel.push(sadness_container.slice(start, end));
                date_panel.push(date_container.slice(start, end));
                start += 5; 
                end += 5;
             }
        
            var data = [];
            
            var date_data = [];
                  
            data.push(sleep_panel);
            data.push(diet_panel);
            data.push(exercise_panel);
            data.push(mood_panel);
            data.push(happiness_panel);
            data.push(sadness_panel);

            date_data.push(date_panel);
        
           
                User.findByIdAndUpdate(user._id, {'local.data' : data}, {new: true}, function(err, docs){
                    if(err) throw err;
                });
            
                User.findByIdAndUpdate(user._id, {'local.date_data' : date_data}, {new: true}, function(err, docs){
                    if(err) throw err;
                });         
            
            
            var stats = docs;
            res.render('stats.ejs', {
                title: 'Moodify - Statistics',
                style: 'stats.css',
                logic: 'stats.js',
                user: req.user,
                stats: stats,
                moment: moment
            }); 
        });
        } else {
            res.render('stats.ejs', {
                title: 'Moodify - Statistics',
                style: 'stats.css',
                logic: 'stats.js',
                user: req.user
            }); 
        }
        
      
        
        });
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}