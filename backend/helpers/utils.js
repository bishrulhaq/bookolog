const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs.log' })
  ]
});


function sanitizedUri(uri) {
    const sanitizedTitle = uri.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const truncatedTitle = sanitizedTitle.substring(0, 300);
    const convertedTitle = truncatedTitle.replace(/&/g, 'and');
    const finalSlug = convertedTitle.replace(/^-+|-+$/g, '');
    return encodeURIComponent(finalSlug);
}

module.exports = {
    sanitizedUri,
    logger
};