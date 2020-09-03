"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spdy = require("spdy");
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swagger_1 = require("./swagger");
var fs = require("fs");
var bodyParser = require("body-parser");
var MongoDal = require("./mongo");
var swaggerJSDoc = require("swagger-jsdoc");
var middleware_1 = require("./middleware");
var handlergenerator_1 = require("./handlergenerator");
var config = require('./config');
var m = new middleware_1.Middleware();
var mongo = new MongoDal.MongoDal();
var handlers = new handlergenerator_1.HandlerGenerator(mongo);
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'MyAPI',
            version: '1'
        },
        basePath: "https://localhost:8443"
    },
    apis: ["server.js"],
};
var swaggerDocs = swaggerJSDoc(swaggerOptions);
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(/*swaggerDocs*/ swagger_1.swaggerDocument));
app.get('/api', function (req, res) {
    res.status(200).json({ foo: 'test' });
});
//var query = { _id: "e625b7c0-09e6-422c-92db-8680d2be7282" };
var query = {};
app.post('/api/login', handlers.login);
app.get('/api/verify', m.checkToken, handlers.index);
var response = null;
app.post('/api/getQuery', m.checkToken, function (req, res) {
    //res.status(200);
    mongo.ExecuteQuery(query, response).then(function (value) {
        res.status(200).json(value);
    });
});
var certFile = fs.readFileSync('test.pfx');
spdy
    .createServer({
    pfx: certFile,
    passphrase: '1234'
}, app).listen(8443);
//# sourceMappingURL=server.js.map