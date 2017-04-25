module.exports = function (app, userModel, socialModel, mediaModel) {

    var facebookConfig = {
        clientID     : "1909914955921576",
        clientSecret : "0ea82076939c8c12e973c4ffe0eb45cf",
        //callbackURL  : "http://localhost:3000/auth/facebook/callback"
        callbackURL  : "https://harsharahul-webdev.herokuapp.com/auth/facebook/callback"
    };


    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));//for facebook

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/',
            failureRedirect: '/project/#!/login'
        }));

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedin);
    app.get("/api/isadmin", isadmin);
    app.get("/api/isshow",isShow);


    app.get("/universalSearch/api/user/all",getAllUsers);
    app.get("/universalSearch/api/user", findUser);
    app.get("/universalSearch/api/loggeduser", findUserById);
    app.put("/universalSearch/api/user", updateUser);
    app.put("/universalSearch/api/user/:uid", updateUserById);

    app.post("/universalSearch/api/user", createUser);
    app.delete("/universalSearch/api/user", deleteUser);
    app.delete("/universalSearch/api/user/:uid", deleteUserByID);

    function deleteUserByID(req,res) {
        var uid = req.params.uid;

        return nestedDelete(uid,res);

    }

    function nestedDelete(uid,res) {
        console.log(uid);
        var promise = userModel.deleteUser(uid);
        promise
            .then(function (response) {

                //Adding logic to delete the user data recursively
                socialModel
                    .deleteThreadByUserId(uid)
                    .then(function (thread) {
                        mediaModel
                            .deleteMediaByUser(uid)
                            .then(function (media) {
                                res.sendStatus(200);
                            })
                    })


            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateUserById(req,res) {
        var uid = req.params.uid;

        var newUser = req.body;


        updateUserHelper(uid,newUser,res);

    }
    
    function facebookStrategy(token, refreshToken, profile, done) {
        var fbid = profile.id;
        var promise = userModel.findUserByFacebookId(fbid);

        promise
            .then(function (user) {
                if(user){
                    done(null, user);
                }
                else{
                    var newUser = new Object();
                    newUser.role="MOVIE";

                    newUser.username = profile.displayName;
                    newUser.firstName = profile.displayName;
                    newUser.facebook = new Object();
                    newUser.facebook.id = fbid;
                    newUser.facebook.token = token.toString();
                    userModel
                        .createUser(newUser)
                        .then(function (createduser) {
                            if(createduser){
                                done(null,createduser);
                            }
                            else{
                                done(null,false);
                            }
                        })
                        .catch(function (err) {
                            done(null,false);
                        })
                }
            })
            .catch(function (err) {
                done(null,false);
            })
    }

    function isShow(req,res) {
        if(req.isAuthenticated()){
            if(req.user.role == "SHOW" || req.user.role=="ADMIN"){
                res.send(req.user);
            }
            else {
                res.send('0');
            }
        }
        else {
            res.send('0');
        }
    }

    function isadmin(req, res) {
        if(req.isAuthenticated()){
            if(req.user.role === "ADMIN"){
                res.sendStatus(200);
            }
            else {
                res.send('0');
            }
        }
        else {
            res.send('0');
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function register (req, res) {

        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(function(createdUser){

                    if(createdUser){

                        req.login(createdUser, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(createdUser);
                            }
                        });
                    }
                    else {
                        console.log("error in creating user");
                    }
                }
            )
            .catch(function (err) {
                res.status(400).send(err);
            });
    }


    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }


    function login(req,res) {
        var user = req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserbyUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {

                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    passport.serializeUser(serializeUser);


    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function getAllUsers(req,res) {
        var promise = userModel.getAllUsers();
        promise
            .then(function (users) {
                if(users.length!=0){
                    res.json(users);
                }
                else{
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);
            })
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var useravail = req.query.useravail;

        if(useravail){
            checkUsernameAvailibility(req,res);
        }

        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserbyUsername(req,res);
        }
    }

    function checkUsernameAvailibility(req,res) {
        var username = req.query.username;

        var promise = userModel.findUserbyUsername(username);

        promise.then(function (users) {

            if(users){
                res.sendStatus(409);
            }
            else {
                res.sendStatus(200);
            }
        })
            .catch(function (err) {
                res.sendStatus(400);
            })
    }

    function findUserByCredentials(req, res) {
        var username  = req.query.username;
        var password = req.query.password;

        var promise = userModel.findUserByCredentials(username,password);
        promise
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUserbyUsername(req, res) {
        var username  = req.query.username;

        var promise = userModel.findUserbyUsername(username);
        promise
            .then(function (users) {
                if(users.length != 0){
                    res.json(users[0]);
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        //var userId = req.params.userId;

        if(!req.sessionID){
            res.sendStatus(419);
        }

        var userId = req.user._id;

        var promise = userModel.findUserById(userId);
        promise
            .then(function (user) {
                res.json(user);
            },function (err) {
                res.sendStatus(500).send(err);
            });
    }
    function updateUser(req, res) {

        if(!req.sessionID){
            res.sendStatus(419);
        }
        var userId = req.user._id;
        // var userId = req.params.userId;
        var newUser = req.body;

        updateUserHelper(userId,newUser,res);


    }

    function createUser(req, res){
        var user = req.body;
        var newUser = {
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName};

        var promise = userModel.createUser(newUser);
        promise
            .then(function (newUser) {
                res.json(newUser);
            },function (err) {
                res.sendStatus(404).send(err);
            });
    }
    function deleteUser(req, res) {

        if(!req.sessionID){
            res.sendStatus(419);
        }
        var userId = req.user._id;


        nestedDelete(userId,res);
    }


    function updateUserHelper(uid, user, res) {

        if(!user){
            res.sendStatus(400);
        }

        var promise = userModel.findUserById(uid);
        promise
            .then(function (obtainedUser) {


                if(obtainedUser){

                    if(user.password == obtainedUser.password){

                        var updatePromise = userModel.updateUser(uid, user);
                        updatePromise
                            .then(function (response) {
                                res.json(obtainedUser);
                            })
                            .catch(function (err) {
                                res.sendStatus(400);
                            })
                    }
                    else{

                        user.password = bcrypt.hashSync(user.password);
                        var updatePromise = userModel.updateUser(uid, user);
                        updatePromise
                            .then(function (response) {
                                res.json(obtainedUser);
                            })
                            .catch(function (err) {
                                res.sendStatus(400);
                            })

                    }
                }
                else{
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }
}
