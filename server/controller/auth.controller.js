import User from "../models/user.js";
import sendEmail from "../utils/send.email.js";
import crypto from "crypto";

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

// export const logout = async (req, res) => {
//     try{
//         await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 $set: {
//                     refershToken: undefined
//                 }
//             },
//             {new: true}
//         )

//         return res.
//                 status(200)
//                 .clearCookie("accessToken")
//                 .clearCookie("refershToken")
//                 .json("User logged out")
//     }
//     catch(err){
//         return res.status(500).json({Error: err.message})
//     }
// }