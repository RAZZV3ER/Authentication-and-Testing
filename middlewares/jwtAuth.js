const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET_KEY || 'my_super_secret_key_123';
        const decodedPayload = jwt.verify(authHeader, secret);
        req.accountInfo = decodedPayload;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Error: Token is invalid or expired' });
    }
};

module.exports = authenticateToken;
