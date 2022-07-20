import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModal from '../models/user.js';

const secret = "test";
//code to control signup
export const signin = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const oldUser = await UserModal.findOne({
            email
        });
        if (!oldUser) {
            return res.status(404).json({
                message: "Account Doesnt exist"
            });
        }

        if (oldUser.isGoogle) {
            return res.status(400).json({
                message: "Account registered using Google. Login with Google instead."
            });
        }

        const isPasswordCorrected = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrected) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            email: oldUser.email,
            id: oldUser._id
        }, secret, {
            expiresIn: "1h"
        });

        res.status(200).json({
            result: oldUser,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log(error);
    }
};


export const signup = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;


    try {
        const oldUser = await UserModal.findOne({
            email
        });
        if (oldUser) {
            return res.status(400).json({
                message: "User already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        }); //creating new object of type usermodal

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, secret, {
            expiresIn: "1h"
        });
        res.status(201).json({
            result,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log(error);
    }
};

export const googleSignIn = async (req, res) => {
    const jwtString = req.body.jwt;
    const decoded = jwt.decode(jwtString);
    const {
        sub,
        email,
        name
    } = decoded;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser && !oldUser.isGoogle) {
            return res.status(400).json({
                message: "User already registered using email/password. Sign in using email/password."
            });
        }

        let result;
        if (oldUser) {
            result = {
                _id: oldUser._id.toString(),
                email: oldUser.email,
                name: oldUser.name
            };
        } else {
            const user = await UserModal.create({
                email,
                name,
                googleId: sub,
                isGoogle: true
            });

            result = {
                _id: user._id.toString(),
                email: user.email,
                name: user.name
            };

        }

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, secret, {
            expiresIn: "1h"
        });
        return res.status(200).json({
            result,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong."
        });
        console.log(error);
    }

};