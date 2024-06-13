import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is Require"]
    },
    lastName: {
        type: String,
        required: [true, "LastName is Require"]
    },
    email: {
        type: String,
        required: [true, "Email is Require"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is Require"],
        minlength: [6, "Pasword must be al least 6 Character"],
        selec: true,
    },
    accountType: {
        type: String,
        default: "seeker"
    },
    contact: {
        type: String,
    }
    ,
    location: {
        type: String
    },

    profileUrl: {
        type: String
    },

    jobTitle: {
        type: String
    },
    about: {
        type: String
    }
}
    ,
    { timestamps: true }
)
userSchema.pre("save", async function () {
    if (!this.isModified) {
        return;
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Compare the password

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

// JWT Toekn

userSchema.methods.createJWT = async () => {
    return JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

const Users = mongoose.model("Users", userSchema)
export default Users