"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidate = exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.Schema({
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
const userValidate = (user) => {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().required(),
        username: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required()
    });
    return schema.validate(user);
};
exports.userValidate = userValidate;
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
