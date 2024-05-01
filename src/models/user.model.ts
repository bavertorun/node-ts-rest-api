import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { IUser } from '../types'

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const userValidate = (user: IUser) => {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(user);
};

const User = model<IUser>('User', userSchema);
export { User, userValidate };
