"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var spdy = require("spdy");
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var fs = require("fs");
var bodyParser = require("body-parser");
var swaggerJSDoc = require("swagger-jsdoc");
var middleware_1 = require("./middleware");
var handlergenerator_1 = require("./handlergenerator");
var config = require('./config');
//import middleware = require('./middleware');
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
//const expressSwagger = require('express-swagger-generator')(app);
//var productController = require('./Controller/ProductController')();
//app.use('/api', productController);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//expressSwagger(swaggerOptions);
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
app.post('/login', handlers.login);
app.get('/verify', m.checkToken, handlers.index);
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
 *
 *
 *     responses:
 *     200:
 *       description: Success!
 */
app.post('/api', function (req, res) {
    res.json({ foo: 'test2' });
});
//const server = http2
//    .createSecureServer({
var certFile = fs.readFileSync('test.pfx');
spdy
    .createServer({
    //key: fs.readFileSync(path.resolve("", './server.key')),
    //cert: fs.readFileSync(path.resolve("", './server.cert'))
    //key: fs.readFileSync('localhost-privkey.pem'),
    //cert: fs.readFileSync('localhost-cert.pem')
    pfx: certFile,
    passphrase: '1234'
}, app).listen(8443);
// (err) => {
//if (err) {
//     throw new Error(err);
// }});
//server.on('error', (err) => console.error(err));
//server.on('stream', (stream, headers) => {
//stream is a Duplex
//  stream.respond({
//    'content-type': 'text/html; charset=utf-8',
//    ':status': 200
//  });
//  stream.end('<h1>Hello World</h1>');
//});
//server.listen(8443);
//app.listen(8443, (err) => {
//   if (err) {
//       throw new Error(err);
//   }
/* eslint-disable no-console */
//  console.log('Listening on port:3000');
/* eslint-enable no-console */
//});
//# sourceMappingURL=helloworld.js.map