module.exports = function (app, userModel) {

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
    //app.get("/api/loggeduser",loggeduser);
    // app.get("/universalSearch/api/user/all",getAllUsers);
    // app.get("/universalSearch/api/user", findUser);
    // app.get("/universalSearch/api/user/:userId", findUserById);
    // app.put("/universalSearch/api/user/:userId", updateUser);
    // app.post("/universalSearch/api/user", createUser);
    // app.delete("/universalSearch/api/user/:userId", deleteUser);

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

        console.log(uid);
        var promise = userModel.deleteUser(uid);
        promise
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });

    }

    function updateUserById(req,res) {
        var uid = req.params.uid;

        var newUser = req.body;
        //console.log(uid);
        //console.log(newUser);

        var promise = userModel.updateUser(uid,newUser);

        promise
            .then(function (response) {
                if(response.nModified === 1){
                    // Update was successful
                    userModel
                        .findUserById(uid)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }
    
    function facebookStrategy(token, refreshToken, profile, done) {
        var fbid = profile.id;
        var promise = userModel.findUserByFacebookId(fbid);

        console.log(profile);

        console.log("Inside facebook strategy");
        promise
            .then(function (user) {
                //console.log("HERREEE");
                //console.log(user);
                if(user){
                    //console.log("User already exists");
                    done(null, user);
                }
                else{
                    //console.log("Creating new user");
                    // console.log(profile);
                    // console.log(profile.id);
                    // console.log(token);
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
                                //console.log("Created new user");
                                //console.log(createduser);
                                done(null,createduser);
                            }
                            else{
                                done(null,false);
                            }
                        })
                        .catch(function (err) {
                            done(null,false);
                        })
                    //userModel.createUser()
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

        //console.log("Inside server register function")
        var user = req.body;
        //console.log(req.body);
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(function(createdUser){
                    // console.log("success in sever service register")
                    // console.log(user)

                    if(createdUser){
                        //console.log("In if user")
                        //res.json(createdUser);

                        req.login(createdUser, function(err) {
                            if(err) {
                                console.log("In err")
                                res.status(400).send(err);
                            } else {
                                console.log("success");
                                res.json(user);
                            }
                        });
                    }
                    else {
                        console.log("error in creating user");
                    }
                }
            )
            .catch(function (err) {
                console.log("catch error in register")
                res.status(400).send(err);
            });
    }


    function logout(req, res) {
        req.logOut();
        // res.send(200);
        console.log("logging out the user");
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
                    //console.log(user);
                    //console.log(username);
                    //console.log(password);
                    //console.log(user.password);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        //console.log("Found user");
                        //console.log(user);

                        return done(null, user);
                    } else {
                        console.log("user not found 123");
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        console.log("user not found 74979234793412");
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
        if(username && password){
            findUserByCredentials(req,res);
        }
        else if(username){
            findUserbyUsername(req,res);
        }
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
    // function findUserByCredentials(req, res) {
    //     var username = req.query["username"];
    //     var password = req.query["password"];
    //
    //     var promise = userModel.findUserByCredentials(username,password);
    //     promise
    //         .then(function (response) {
    //             if(response.length != 0){
    //                 res.json(response[0]);
    //             }
    //             else{
    //                 res.sendStatus(400);
    //             }
    //         },function (err) {
    //             res.sendStatus(404);
    //         });
    //
    // }
    function findUserById(req, res) {
        //var userId = req.params.userId;

        if(!req.sessionID){
            res,sendStatus(419);
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


        var promise = userModel.updateUser(userId,newUser);

        promise
            .then(function (response) {
                if(response.nModified === 1){
                    // Update was successful
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        },function () {
                            res.sendStatus(404);
                        })
                }
                else{
                    res.sendStatus(404);
                }
            },function () {
                res.sendStatus(404);
            });
    }
    function createUser(req, res){
        var user = req.body;
        //var userId = (parseInt(users[users.length -1]._id) + 1).toString();
        var newUser = {
            //_id: userId,
            username: user.username,
            password: user.password,
            role: user.role,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName};
        // users.push(newUser);
        // res.json(newUser);

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
        // var userId = req.params.userId;

console.log("Here in service delete");
        var promise = userModel.deleteUser(userId);
        promise
            .then(function (response) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(404);
            });
    }
}
