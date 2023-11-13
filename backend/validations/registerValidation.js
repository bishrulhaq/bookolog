const Joi = require('joi');

const passwordComplexity = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    first_name: Joi.string().required().messages({
        'any.required': 'First name is required.',
    }),
    last_name: Joi.string().required().messages({
        'any.required': 'Last name is required.',
    }),
    password: Joi.string().custom((value, helpers) => {
        if (!passwordComplexity(value)) {
            return helpers.message('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        }
        return value;
    }, 'Password Complexity').required().messages({
        'any.required': 'Password is required.',
    }),
});

module.exports = registerSchema;
