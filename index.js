const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const postRoutes = require('./routes/postRoutes');
const app = express();
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple Blog API',
            version: '1.0.0',
        },
    },
    apis: ['./swagger/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/posts', postRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
