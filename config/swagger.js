const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.1.0", // OpenAPI versiyonunu 3.1.0 olarak güncelleyin
        info: {
            title: "Kitap Uygulaması",
            version: "1.0.0",
            description: "Katmanlı Node.js uygulaması"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["../controllers/auth/*.js"] // API tanımlarının dosya yollarını burada belirtin
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
