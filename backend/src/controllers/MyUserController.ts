import { Request, Response } from 'express';
import User from '../models/userModel';

const createCurrentUser = async (req: Request, res: Response) => {
    try {
        
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if(existingUser) {
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());

    } catch (error) {
        res.status(500).send({
            message: "Something Went Wrong.",
        });
    }
}

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
        
        const { name, addressLine1, country, city } = req.body;
        
        const user = await User.findById(req.userId);
        const updatedFields = {name, addressLine1, country, city};

        if(!user) {
            return res.status(404).json({
                message: "User Does not exist.",
            });
        }

        if(name) { updatedFields.name = name };
        if(addressLine1) { updatedFields.addressLine1 = addressLine1 };
        if(country) { updatedFields.country = country };
        if(city) { updatedFields.city = city };

        const updatedUser = await User.findByIdAndUpdate(
            req.userId, 
            updatedFields,
            { new: true, runValidators: true }
        );

        // await user.save();
        
        res.send(updatedUser);

    } catch (error) {
        res.status(500).send({
            message: "Error Updating User",
        });
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        
        const currentUser = await User.findOne({ _id: req.userId });
        if(!currentUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(currentUser);

    } catch (error) {
        res.status(500).send({
            message: "Something went wrong."
        });
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
};