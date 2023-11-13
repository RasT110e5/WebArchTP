const {transports, createLogger, format} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.cli(),
    format.errors({stack: true}),
    format.timestamp(),
  ),
  defaultMeta: {service: 'product-api'},
  transports: [
    new transports.Console(),
    new transports.File({filename: 'error.log', level: 'error', timestamp: true}),
    new transports.File({filename: 'combined.log', timestamp: true}),
  ],
});

module.exports = logger;
