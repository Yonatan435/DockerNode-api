"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
var jwt = require("jsonwebtoken");
var config = require('./config.js');
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.prototype.checkToken = function (req, res, next) {
        var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    };
    ;
    return Middleware;
}());
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map