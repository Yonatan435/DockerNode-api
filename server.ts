import spdy = require('spdy');

import express = require('express');
import swaggerUi = require('swagger-ui-express');
import { swaggerDocument } from "./swagger";
import path = require('path');
import fs = require('fs'); 
import bodyParser = require('body-parser');
import MongoDal = require('./mongo');
import swaggerJSDoc = require('swagger-jsdoc');
import { createServer } from 'tls';
import jwt = require('jsonwebtoken');
import { Middleware } from './middleware';
import { HandlerGenerator } from './handlergenerator';
import { TestClass } from './testclass';
const config = require('./config');
var m = new Middleware();
var mongo = new MongoDal.MongoDal();
  var handlers = new HandlerGenerator(mongo);
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


app.get('/api', (req, res) => {
   
    res.status(200).json({foo: 'test'});
});
//var query = { _id: "e625b7c0-09e6-422c-92db-8680d2be7282" };
var query = {};
app.post('/api/login',handlers.login);
app.get('/api/verify', m.checkToken, handlers.index);
var response: any = null;
app.post('/api/getQuery', m.checkToken, (req, res) => {
    //res.status(200);
     mongo.ExecuteQuery(query, response).then((value) => {
     res.status(200).json(value);
     });
});

    var certFile = fs.readFileSync('test.pfx')
    spdy
    .createServer({
      
        pfx: certFile,
        passphrase: '1234'
    },app).listen(8443)
       