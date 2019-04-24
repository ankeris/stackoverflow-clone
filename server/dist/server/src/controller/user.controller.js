"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models-mongo/User");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getOne(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    User_1.User.findOne({
        _id: req.params.id
    })
        .then(function (result) {
        if (result) {
            res.send(result);
        }
        else {
            res.json("No document matches the provided query.");
        }
        return result;
    })
        .catch(function (err) { return console.error("Failed to find document: " + err); });
}
exports.getOne = getOne;
function login(req, res, next) {
    User_1.User.findOne({
        name: req.body.name
    })
        .lean()
        .then(function (user) {
        if (!user) {
            res.status(500).json("Username or password incorrect");
        }
        else {
            // Check submitted password
            var submittedPassword = req.body.password;
            bcryptjs_1.default.compare(submittedPassword, user.password, function (err, isMatch) {
                if (err)
                    throw err;
                if (!isMatch) {
                    res.status(500).json("Username or password incorrect");
                }
                // Remove password from token since we don't need it
                delete user.password;
                jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "7 days" }, function (err, token) {
                    res.status(200).json(token);
                });
            });
        }
    });
}
exports.login = login;
function createUser(req, res) {
    res.setHeader("Content-Type", "application/json");
    User_1.User.findOne({ name: req.body.name }, function (err, user) {
        if (user) {
            res.status(500).json("Account with this name already exists");
        }
        else {
            var regex = RegExp("^[A-z0-9_-]{3,25}$");
            var validName = regex.test(req.body.name);
            var validPassword = regex.test(req.body.password);
            if (validName && validPassword) {
                var newItem_1 = new User_1.User({
                    name: req.body.name,
                    password: req.body.password
                });
                bcryptjs_1.default.genSalt(10, function (err, salt) {
                    if (err)
                        throw err;
                    bcryptjs_1.default.hash(newItem_1.password, salt, function (err, hash) {
                        if (err)
                            throw err;
                        // Hash the password
                        newItem_1.password = hash;
                        newItem_1
                            .save()
                            .then(function (item) { return res.json({ item: item }); })
                            .catch(function (err) { return console.error(err); });
                    });
                });
            }
            else {
                res.status(500).json("Please choose valid username or password");
            }
        }
    });
}
exports.createUser = createUser;
exports.ensureAuth = function (req, res, next) {
    // get value from authorization header
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        // Verify the token
        var bearer = bearerHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(bearer, process.env.JWT_SECRET, function (err, authData) {
            // Throw err status if unauthorized
            if (err)
                res.sendStatus(403);
            else {
                // Allow access the route if everything is fine
                next();
            }
        });
    }
    else {
        // Forbidden
        res.sendStatus(403);
    }
};
