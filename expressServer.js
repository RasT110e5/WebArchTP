const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const jsYaml = require('js-yaml');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const OpenApiValidator = require('express-openapi-validator');
const logger = require('./logger');
const config = require('./config')

class ExpressServer {
  constructor(port, openApiYaml) {
    this.app = express();
    this.setUp(openApiYaml);
  }

  setUp(openApiYaml) {
    this.#importOpenApiSchema(openApiYaml);
    this.#registerBaseRestConfigMiddlewares();
    this.#registerRequestMiddleware();
    this.#registerOpenApiRoutes();
  }

  addOpenApiValidator() {
    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: config.OPENAPI_YAML,
        validateRequests: true,
        validateResponses: true,
        operationHandlers: config.PROJECT_DIR
      }),
    )
    this.#registerValidationFailedMiddleware();
  }

  start() {
    http.createServer(this.app).listen(config.URL_PORT);
    console.log(`Listening on port ${config.URL_PORT}`);
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${config.URL_PORT} shut down`);
    }
  }

  #importOpenApiSchema(openApiYaml) {
    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(openApiYaml));
    } catch (e) {
      logger.error('failed to start Express Server', e.message);
    }
  }

  #registerOpenApiRoutes() {
    this.app.get('/openapi', (req, res) => res.sendFile((path.join(__dirname, 'api', 'openapi.yaml'))));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));
  }

  #registerBaseRestConfigMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json({limit: '14MB'}));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(cookieParser());
  }

  #registerRequestMiddleware() {
    this.app.use((req, res, next) => {
      logger.info(`[${req.method}] ${req.url}`)
      next()
    })
  }

  #registerValidationFailedMiddleware() {
    this.app.use((err, req, res, next) => {
      logger.error("Error while processing request due to validation errors:", err)
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    });
  }
}

module.exports = ExpressServer;
