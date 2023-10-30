const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const crypto = require('crypto');

require('dotenv').config()
const secretKey = process.env.S_KEY;

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

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
    logger,
    encrypt,
    decrypt
};