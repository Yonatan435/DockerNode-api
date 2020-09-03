"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
var swagger_login_1 = require("./swagger.login");
var swagger_login_2 = require("./swagger.login");
var swagger_login_3 = require("./swagger.login");
exports.swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Login API',
        termsOfService: '',
        contact: {
            name: 'yonatan',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: 'https://localhost:8443',
            description: 'Local server'
        }
    ],
    components: {
        schemas: {},
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    tags: [
        {
            name: 'Login'
        }
    ],
    paths: {
        "/api/login": {
            "post": swagger_login_1.getLogin
        },
        "/api/verify": {
            "get": swagger_login_2.getVerify
        },
        "/api/getQuery": {
            "post": swagger_login_3.getQuery
        }
    }
};
//# sourceMappingURL=swagger.js.map