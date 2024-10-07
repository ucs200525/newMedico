// Middleware to validate user registration data
const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    // Basic validation checks
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required for registration' });
    }

    // Check if password is strong enough: at least 8 characters, one uppercase, and one lowercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: '1.Password must be at least 8 characters long \n2.Contain atleast one uppercase and one lowercase letters' });
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
