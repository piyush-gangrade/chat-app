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
    return jwt.sign(
        process.env.ACCESS_TOKEN_KEY,
        {expiredIn: process.env.ACCESS_TOKEN_EXPIRY},
        {
            _id: this._id,
            username: this.username,
        }
    )
}

userSchema.methods.generateRefershToken = function () {
    return jwt.sign(
        process.env.REFERSH_TOKEN_KEY,
        {expiredIn: process.env.REFERSH_TOKEN_EXPIRY},
        {
            _id: this._id
        }
    )
}

userSchema.methods.generateTemporaryToken = function () {
    //token for client 
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
                        .createHash("sha256")
                        .update(unHashedToken)
                        .digest("hex");

    const tokenExpiry = Date.now() + 20 * 60 * 1000;//20 min

    return { unHashedToken, hashedToken, tokenExpiry};
}   

const User = mongoose.model("User", userSchema);

export default User;