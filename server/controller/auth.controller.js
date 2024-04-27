import User from "../models/user.js";
import sendEmail from "../utils/send.email.js";

//generate access token and refersh token
const generateAccessAndRefershTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
    
        const accessToken = user.generateAccessToken();
        const refershToken = user.generateRefershToken();
    
        user.refershToken = refershToken;
        await user.save();
    
        return {accessToken, refershToken};
    }
    catch(err) {
        throw Error("Something went wrong while generating the access token");
    }
}

//send email for verifying email or forgot password
const sendTokenByEmail = async(userId, subject) => {
    try{
        const user = await User.findById(userId);
        const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

        const url = `${process.env.BASE_URL}/auth/${user._id}/${unHashedToken}`
        await sendEmail({
            to: user.email, 
            subject: subject, 
            text: verificationUrl
        });

        return {hashedToken, tokenExpiry}
    }
    catch(err){
        throw Error("Something went wrong while sending the email");
    }
}

export const signup = async (req, res)=>{
    try{
        const {username, email, password} = req.body;

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if(existedUser){
            return res.status(409).json({Error: "User with email or username already exists"})
        }

        const user = await User.create({
            username: username,
            email: email,
            password: password,
            isEmailVerified: false
        })

        const {hashedToken, tokenExpiry} = await sendTokenByEmail(user._id);

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;
        await user.save();

        return res.status(200).json("Succefully created, Verification link send to your gmail.")
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const login = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!username & !email){
            return res.status(400).json({Error: "Username or email is required"})
        }

        const user = await User.findOne({
            $or: [{username}, {email}]
        })

        if(!user){
            return res.status(404).json({Error: "User does not exist"});
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if(!isPasswordValid){
            return res.status(401).json({Error: "Password is not match"});
        }

        if(!user.isEmailVerified){
            const {hashedToken, tokenExpiry} = await sendTokenByEmail(user._id);

            user.emailVerificationToken = hashedToken;
            user.emailVerificationExpiry = tokenExpiry;

            return res.status(403).json({Error: "Email is not verified. Please verify your email, verification link send to your gmail"})
        }

        const {accessToken, refershToken} = await generateAccessAndRefershTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refershToken", refershToken)
            .json({accessToken, refershToken})
    }
    catch(err){
        return err.status(500).json({Error: err.message});
    }
}
