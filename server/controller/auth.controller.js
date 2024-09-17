import User from "../models/user.js";
import sendEmail from "../utils/send.email.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

//generate access token and refersh token
const generateAccessAndRefershTokens = async(userId) => {
    try{
        const user = await User.findById(userId);

        //get accessToke and refershToken
        const accessToken = user.generateAccessToken();
        const refershToken = user.generateRefershToken();
    
        user.refershToken = refershToken;
        await user.save();
    
        return {accessToken, refershToken};
    }
    catch(err) {
        throw new Error("Something went wrong while generating the access token");
    }
}

//send email for verifying email or forgot password
const sendTokenByEmail = async(userId, userEmail, subject) => {
    try{
        const { unHashedToken, hashedToken, tokenExpiry } = User.generateTemporaryToken();
        
        //url link for verify email or forgot password
        const url = `${process.env.BASE_URL}/auth/${userId}/${unHashedToken}`
        await sendEmail({
            email: userEmail, 
            subject: subject, 
            text: url
        });

        return {hashedToken, tokenExpiry}
    }
    catch(err){
        throw new Error("Something went wrong while sending the email");
    }
}

export const signup = async (req, res)=>{
    try{
        const {username, email, password} = req.body;

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        //check if the username or email already exists
        if(existedUser){
            return res.status(409).json({Error: "User with email or username already exists"})
        }

        const user = await User.create({
            username: username,
            email: email,
            password: password,
            isEmailVerified: false
        })

        //send email verification
        const {hashedToken, tokenExpiry} = await sendTokenByEmail(user._id, user.email, "verify email");

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

        // either a username or an email must exist
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

        //Check if the email is verified. If it is not verified, then send a verification link
        if(!user.isEmailVerified){
            const {hashedToken, tokenExpiry} = await sendTokenByEmail(user._id, user.email, "verify email");

            user.emailVerificationToken = hashedToken;
            user.emailVerificationExpiry = tokenExpiry;
            await user.save();

            return res.status(403).json({Error: "Email is not verified. Please verify your email, verification link send to your gmail"})
        }

        const {accessToken, refershToken} = await generateAccessAndRefershTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refershToken", refershToken)
            .json({userId: user._id,accessToken, refershToken})
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}

export const verifyEmail = async (req, res)=>{
    try{
        const {userId, token} = req.params;
        
        const hashedToken = crypto
                                .createHash("sha256")
                                .update(token)
                                .digest("hex");

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({Error: "User does not exist."});
        }

        //Check if the token is not the same or try to access it after the expiry time
        if((user.emailVerificationToken !== hashedToken) || (user.emailVerificationExpiry  < Date.now())){

            return res.status(401).json({Error: "Token is invalid or expired"})
        }

        user.isEmailVerified = true;

        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;


        await user.save();
        
        return res.status(200).json("Email is verified")
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: err.message})
    }
}

export const refershAccessToken = async(req, res)=>{
    const refershToken = req.cookies?.refershToken || req.body?.refershToken;
    console.log(refershToken)
    try{
        if(!refershToken){
            const error = new Error("Unauthorized request");
            error.status = 401;
            throw error;
        }
        const decodedRefershToken = jwt.verify(refershToken, process.env.REFRESH_TOKEN_SECRET);
        if(!decodedRefershToken){
            const error = new Error("Unauthorized request");
            error.status = 401;
            throw error;
        }

        const user = await User.findById(decodedRefershToken._id);
        if(!user){
            const error = new Error("Unauthorized request");
            error.status = 401;
            throw error;
        }
        // console.log(refershToken, user.refershToken)

        if(user.refershToken !== refershToken){
            const error = new Error("Unauthorized request");
            error.status = 401;
            throw error;
        }

        const {accessToken, refershToken: newRefershToken} = await generateAccessAndRefershTokens(user._id);
        res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refershToken", newRefershToken)
            .json({response: {userId: user._id, accessToken, refershToken: newRefershToken}, success: true})

    }
    catch(err){
        console.error(err);
        return res.status(err.status || 500).json({response: err.message || "Something went wrong", success: false});
    }
}

export const logout = async(req, res)=>{
    const userId = req.user._id || req.body.userId;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({Error: "Token is invalid or expired"})
        }
        user.accessToken = null;
        user.refershToken = null;

        await user.save();
        res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refershToken")
        .json({response: "User is successfully logout.", success: true});
    }
    catch(err){
        console.error(err);
        res.status(err.status || 500).json({response: err.message || "Something went wrong", success: false});
    }
}