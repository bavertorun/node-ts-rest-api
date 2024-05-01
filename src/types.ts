import { Document } from "mongoose";

export interface IUser extends Document {
    fullname: string,
    username: string,
    email: string,
    password: string,
}