import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true
        },
        email: {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true  
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refershToken: {
            type: String
        },
        forgetPasswordToken: {
            type: String
        },
        forgetPasswordExpiry: {
            type: Date
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    try{
        return jwt.sign(
            {
                _id: this._id,
                username: this.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY},
        )
    }
    catch(err){
        console.log(err)
    }
}

userSchema.methods.generateRefershToken = function () {
    try{
        return jwt.sign(
            {
                _id: this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRY},
        )
    }
    catch(err){
        console.log(err)
    }
}

userSchema.statics.generateTemporaryToken = function () {
    //token for client 
    try{
        const unHashedToken = crypto.randomBytes(20).toString("hex");
    
        const hashedToken = crypto
                            .createHash("sha256")
                            .update(unHashedToken)
                            .digest("hex");
    
        const tokenExpiry = Date.now() + 20 * 60 * 1000;//20 min
        return { unHashedToken, hashedToken, tokenExpiry};
    }
    catch(err){
        console.log(err)
    }
}   

const User = mongoose.model("User", userSchema);

export default User;