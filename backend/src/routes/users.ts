import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator";

const router = express.Router();
// /api/users/register
  
router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password is 6 or more characters").isLength({min: 6})
], async (req : Request, res: Response) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).json({message: errs.array()});
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
        
        user = new User(req.body);
        await user.save();
        
        const token = jwt.sign({userId: user.id}, 
                                process.env.JWT_SECRET_KEY as string,
                                {expiresIn: "1d"});
        res.cookie("auth_token", token,
                    {httpOnly: true,
                     secure: process.env.NODE_ENV === "production",
                     maxAge: 864000000, // 1day in milliseconds
        });      
        res.status(200).json({ok: true, message: "Regsitration successful"});             

    } catch (err) {
        console.log(err);
        res.status(500).json({ok: false, message: "Something went wrong"});
    };
});

export default router;