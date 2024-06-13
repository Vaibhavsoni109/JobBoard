import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "FirstName is Require"]
    },
    lastname: {
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
})
