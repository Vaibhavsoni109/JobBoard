import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const comapanySchema=new Schema({
    name:{
        type:String,
        required:[true,"Company Name is require"],

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
      about: {
        type: String
    },
    jobPosts:[{type:Schema.Types.ObjectId,ref:"Jobs"}]

})

comapanySchema.pre("save", async function () {
    if (!this.isModified) {
        return;
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Compare the password

comapanySchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

// JWT Toekn

comapanySchema.methods.createToken = async () => {
    return JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}
const Companies = mongoose.model("Companies", comapanySchema)
export default Companies