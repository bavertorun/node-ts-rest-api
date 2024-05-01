"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.userList = exports.findUser = exports.userApiInfo = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userApiInfo = (req, res) => {
    res.json({
        'User Routes': {
            'Find User': {
                'url': '/user/:user-id',
                'method': 'GET'
            },
            'Get User List': {
                'url': '/user/list',
                'method': 'GET'
            },
            'Create User': {
                'url': '/user/create',
                'method': 'POST'
            },
            'Update User': {
                'url': '/user/update',
                'method': 'PUT'
            },
            'Delete User': {
                'url': '/user/delete',
                'method': 'DELETE'
            }
        }
    });
};
exports.userApiInfo = userApiInfo;
const findUser = async (req, res) => {
    const user = await user_model_1.User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ code: 404, message: 'User Not Found' });
    }
    try {
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};
exports.findUser = findUser;
const userList = async (req, res) => {
    try {
        const users = await user_model_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        const err = error.message || "Server Internal error";
        res.status(500).json({ 'message': err });
    }
};
exports.userList = userList;
const createUser = async (req, res) => {
    let user = req.body;
    const { error } = (0, user_model_1.userValidate)(user);
    if (error) {
        return res.status(400).json({ code: 400, message: error.details[0].message });
    }
    const existingEmail = await user_model_1.User.findOne({ email: req.body.email });
    if (existingEmail) {
        return res.status(400).json({ code: 400, message: 'This email is already in use.' });
    }
    bcryptjs_1.default.genSalt(10, async (err, salt) => {
        if (err) {
            console.error('Salt generation error:', err);
        }
        bcryptjs_1.default.hash(user.password, salt, async (err, hash) => {
            if (err) {
                console.error('Hashing error:', err);
            }
            user.password = hash;
            const newUser = new user_model_1.User(user);
            try {
                await newUser.save();
                return res.status(201).json({ code: 201, newUser: newUser });
            }
            catch (error) {
                console.error('User save error:', error);
                return res.status(500).json({ code: 500, message: 'Internal server error' });
            }
        });
    });
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        let user = await user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }
        const { error } = (0, user_model_1.userValidate)(req.body);
        if (error) {
            return res.status(400).json({ code: 400, message: error.details[0].message });
        }
        bcryptjs_1.default.genSalt(10, async (err, salt) => {
            if (err) {
                console.error('Salt generation error:', err);
                return res.status(500).json({ code: 500, message: 'Internal server error' });
            }
            bcryptjs_1.default.hash(req.body.password, salt, async (err, hash) => {
                if (err) {
                    console.error('Hashing error:', err);
                    return res.status(500).json({ code: 500, message: 'Internal server error' });
                }
                req.body.password = hash;
                try {
                    user = await user_model_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                    if (!user) {
                        return res.status(404).json({ code: 404, message: 'User not found' });
                    }
                    return res.status(200).json({ code: 200, message: 'User updated successfully', updatedUser: user });
                }
                catch (error) {
                    console.error('User update error:', error);
                    return res.status(500).json({ code: 500, message: 'Internal server error' });
                }
            });
        });
    }
    catch (error) {
        console.error('Update user error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const deleteUser = await user_model_1.User.deleteOne({ _id: req.params.id });
        if (!deleteUser) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }
        if (deleteUser.deletedCount === 1) {
            return res.status(200).json({ code: 200, message: 'User Deleted!', deleteUser: deleteUser });
        }
    }
    catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};
exports.deleteUser = deleteUser;
