// Middleware to validate user registration data
const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    // Basic validation checks
    if (!name || !email || !password ) {
        return res.status(400).json({ message: 'All fields are required for registration' });
    }
    // Check if password is strong enough
    if (password.length < 1) {
        return res.status(400).json({ message: 'Password must be at least 1 characters long' });
    }

    next(); // Proceed to the next middleware or controller
};

// Middleware to validate user login data
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Basic validation checks
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required for login' });
    }

    next(); // Proceed to the next middleware or controller
};

module.exports = { validateRegister, validateLogin };
