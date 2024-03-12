const jwt = require('jsonwebtoken');
const secretKey = process.env.NEXTAUTH_SECRET;
const {token} = require('../models');

async function authenticateJWT(req, res, next) {

    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const tokenRecord = await token.findOne({ where: { token : access_token } });

        if (!tokenRecord) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (tokenRecord.expires_at < new Date()) {
            return res.status(401).json({ error: 'Token expired' });
        }

        if (tokenRecord.revoked) {
            return res.status(401).json({ error: 'Token revoked' });
        }

        jwt.verify(tokenRecord.token, secretKey, async (err, user) => {

            if (err) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            req.user = user;
            next();
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Middleware error' });
    }
}

module.exports = authenticateJWT;