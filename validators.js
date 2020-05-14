const {body} = require('express-validator');

const registerValidation = [
  // Name should not be empty
  body('name').not().isEmpty().withMessage("Name is required."),

    // Username should not be empty
  body('username').not().isEmpty().withMessage("Email is required.").isLength({min : 6}).withMessage("Username must be atleast 6 characters long."),

  // Password needs to be min 6 chars
  body('password1').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

  // Confirm Password needs to be min 6 chars AND must match the req.body.password field
  body('password2').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

const loginValidation = [
  body('username').not().isEmpty().withMessage("Username is required."),
  body('password').not().isEmpty().withMessage("Password is required.")
];

module.exports = {registerValidation, loginValidation};