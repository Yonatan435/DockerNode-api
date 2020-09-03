import { getLogin } from './swagger.login';
import { getVerify } from './swagger.login';
import { getQuery } from './swagger.login';
export const swaggerDocument = {
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
            "post": getLogin
        },
        "/api/verify": {
            "get": getVerify
        },
        "/api/getQuery": {
            "post": getQuery
        }
    }
}