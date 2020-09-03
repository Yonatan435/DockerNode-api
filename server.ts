import spdy = require('spdy');

import express = require('express');
import swaggerUi = require('swagger-ui-express');
import { swaggerDocument } from "./swagger";
import path = require('path');
import fs = require('fs'); 
import bodyParser = require('body-parser');
import swaggerJSDoc = require('swagger-jsdoc');
import { createServer } from 'tls';
import jwt = require('jsonwebtoken');
import { Middleware } from './middleware';
import { HandlerGenerator } from './handlergenerator';
import { TestClass } from './testclass';
const config = require('./config');
var m = new Middleware();

  var handlers = new HandlerGenerator();
const swaggerOptions={
    swaggerDefinition:{
        info:{
   title:'MyAPI',
   version:'1'
    }, 
    basePath:  "https://localhost:8443"
},
apis:["server.js"],

}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(/*swaggerDocs*/swaggerDocument));

/**
 * @swagger
 * /api:
 *  get:
 *      description: Use to request all
 *      responses: 
 *          '200':
 *              description: A good response
 */
app.get('/api', (req, res) => {
   
    res.status(200).json({foo: 'test'});
});

app.post('/api/login',handlers.login);
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
app.post('/api', (req, res) => {
    res.json({foo: 'test2'});
});

    var certFile = fs.readFileSync('test.pfx')
    spdy
    .createServer({
      
        pfx: certFile,
        passphrase: '1234'
    },app).listen(8443)
       