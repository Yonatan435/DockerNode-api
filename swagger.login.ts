export const getLogin = {
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
                      properties:{
                                    username:{
                                        type:"string",
                                        example:"admin"
                                    },
                                    password:{
                                        type:"string",
                                        example:"password"
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
} 
export const getVerify = {
    tags: ['Verify'],
    description: "VerifyMethod",
    operationId: 'verify',
    security: [
        {
            bearerAuth: []
        }
    ],
    
    responses: {
        "200": { }
    }
} 