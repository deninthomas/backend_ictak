const jwt = require('jsonwebtoken');
const Mentor = require('../models/Mentor');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user is a mentor
            const mentor = await Mentor.findById(decoded.id);
            if (!mentor) {
                return res.status(403).json({ message: 'Not authorized as mentor' });
            }

            req.user = mentor; // Attach mentor info to request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};
