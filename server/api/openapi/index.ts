import swaggerJSDoc from 'swagger-jsdoc'
import { schemas } from './schemas'

export default defineEventHandler(() => {
    return swaggerJSDoc({
        swaggerDefinition: {
            openapi: '3.0.3',
            info: {
                title: 'Система отслеживания здоровья учащихся школ Курской области',
                version: ''
            },
            schemes: ['http', 'https'],
            components: {
                schemas,
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            tags: [
                { name: 'Auth' },
                { name: 'Municipalities' },
                { name: 'Educational Organizations' },
                { name: 'Classes' },
                { name: 'Students' },
                { name: 'Students Health' },
                { name: 'Logs' }
            ]
        },
        apis: ['server/api/**/*.ts']
    })
})
