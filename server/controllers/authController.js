import Users from "../models/userModel";


export const register =async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body

    //validate field
    if (!firstname) {
        next("First Name is Require");
    }
    if (!lastname) {
        next("last Name is Require")
    }

    if (!email) {
        next("email is Require")
    }
    if (!password) {
        next("password is Require")
    }
    try {
const userExists=await Users.findOne({email})
if(userExists)
    {
        next("user With this email is already exists");
    }
    const user=await Users.create({
        firstname,
        lastname,
        email,
        password
    })

    const token=user.createJWT();

    res.status(201).send({
        success:true,
        message:"Account has been create succesfully",
        user:{
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            accountType:user.accountType

        },token,
    })
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error.message})
    }
}

export const signIn = (req, res, next) => {
}
