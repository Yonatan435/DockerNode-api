"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerGenerator = void 0;
var jwt = require("jsonwebtoken");
var config = require('./config.js');
var HandlerGenerator = /** @class */ (function () {
    function HandlerGenerator(mongo) {
        this._mongo = mongo;
    }
    HandlerGenerator.prototype.login = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        // For the given username fetch user from DB
        var mockedUsername = 'admin';
        var mockedPassword = 'password';
        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                var token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' // expires in 24 hours
                });
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }
            else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        }
        else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    };
    HandlerGenerator.prototype.index = function (req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    };
    return HandlerGenerator;
}());
exports.HandlerGenerator = HandlerGenerator;
//# sourceMappingURL=handlergenerator.js.map