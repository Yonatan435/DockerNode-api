"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = exports.getVerify = exports.getLogin = void 0;
exports.getLogin = {
    tags: ['Login'],
    description: "LoginMethod",
    operationId: 'login',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        username: {
                            type: "string",
                            example: "admin"
                        },
                        password: {
                            type: "string",
                            example: "password"
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Valid Login response",
        },
        "403": {
            description: "Invalid login response",
        }
    }
};
exports.getVerify = {
    tags: ['Verify'],
    description: "VerifyMethod",
    operationId: 'verify',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {}
    }
};
exports.getQuery = {
    tags: ['Query'],
    description: "QueryMethod",
    operationId: 'query',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {}
    }
};
//# sourceMappingURL=swagger.login.js.map