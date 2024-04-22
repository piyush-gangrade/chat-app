import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";

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

        const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;
        await user.save();

        const verificationUrl = `${process.env.BASE_URL}/auth/${user._id}/${unHashedToken}`
        await sendEmail(user.email, "Verify Email", verificationUrl);

        return res.status(200).json("Succefully created, Verification link send on your gmail.")
    }
    catch(err){
        return res.status(500).json({Error: err.message});
    }
}
