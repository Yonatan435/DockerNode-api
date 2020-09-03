"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spdy = require("spdy");
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swagger_1 = require("./swagger");
var fs = require("fs");
var bodyParser = require("body-parser");
var swaggerJSDoc = require("swagger-jsdoc");
var middleware_1 = require("./middleware");
var handlergenerator_1 = require("./handlergenerator");
var config = require('./config');
var m = new middleware_1.Middleware();
var handlers = new handlergenerator_1.HandlerGenerator();
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
/**
 * @swagger
 * /api:
 *  get:
 *      description: Use to request all
 *      responses:
 *          '200':
 *              description: A good response
 */
app.get('/api', function (req, res) {
    res.status(200).json({ foo: 'test' });
});
app.post('/api/login', handlers.login);
app.get('/api/verify', m.checkToken, handlers.index);
/**
 * @swagger
 * /api:
 *  post:
 *     summary: Updates the status message.
 *     consumes:
 *       - application/json
 *     parameters:
 *     - in: body
 *       name: status
 *       required: true
 *       schema:
 *          type: object
 *          properties:
 *             a:
 *               type: object
 *
 *     responses:
 *     200:
 *       description: Success!
 */
app.post('/api', function (req, res) {
    res.json({ foo: 'test2' });
});
var certFile = fs.readFileSync('test.pfx');
spdy
    .createServer({
    pfx: certFile,
    passphrase: '1234'
}, app).listen(8443);
//# sourceMappingURL=server.js.map