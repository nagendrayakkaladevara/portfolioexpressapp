const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'Documentation for Express API',
  },
  basePath: '/',
};


const options = {

  swaggerDefinition,
  // Path to the API docs
  apis: ['./server/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

