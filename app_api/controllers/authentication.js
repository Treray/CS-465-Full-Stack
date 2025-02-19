const mongoose = require('mongoose');

// ✅ Ensure this line is present
require('../models/user'); // Load the user schema first

// ✅ Fix model name to match your schema (use "user" not "users")
const User = mongoose.model('user'); // Ensure schema is loaded correctly

const register = async (req, res) => {
    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save(); // ✅ Use async/await

        res.status(200).json({ token: user.generateJWT() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user || !user.validatePassword(req.body.password)) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            res.status(200).json({ token: user.generateJWT() });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { register, login };
