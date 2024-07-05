import {body} from "express-validator";

const userSignupValidator = () => {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username is must be lowercase")
            .isLength({min: 3})
            .withMessage("Username must be at least 3 characters long"),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ]
};

const userLoginValidator = () => {
    return [
    body("username")
    .optional(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

    body("password")
        .notEmpty()
        .withMessage("password is required")
]}

export {
    userSignupValidator,
    userLoginValidator
}