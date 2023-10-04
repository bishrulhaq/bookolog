const allowedIPs = ['0']; // Example allowed IP addresses

function validateIPWhitelist(req, res, next) {
  const clientIP = req.ip;
  
  // for now, It's skiped
  if (allowedIPs.includes(clientIP)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}

module.exports = validateIPWhitelist;