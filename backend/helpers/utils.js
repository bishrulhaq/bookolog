const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;
const crypto = require('crypto');
const path = require("path");
const fs = require("fs");
const axios = require("axios");

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

const logFormat = printf(({level, message, timestamp}) => {
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
        new transports.File({filename: 'logs.log'})
    ]
});

function sanitizedUri(uri) {
    const sanitizedTitle = uri.replace(/(\w+)'?/g, '$1').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const truncatedTitle = sanitizedTitle.substring(0, 300);
    const convertedTitle = truncatedTitle.replace(/&/g, 'and');

    const finalSlug = convertedTitle.replace(/^-+|-+$/g, '');
    return encodeURIComponent(finalSlug);
}

async function saveUriImage(imageName, img_path, img_uri) {
    const imagePath = path.join(img_path, imageName);
    const writer = fs.createWriteStream(imagePath);

    try {

        const response = await axios({
            url: img_uri,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        return true;

    } catch (error) {
        return false;
    }
}

module.exports = {
    sanitizedUri,
    logger,
    encrypt,
    decrypt,
    saveUriImage
};