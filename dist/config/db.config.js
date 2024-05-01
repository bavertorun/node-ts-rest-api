"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const { connect } = require('mongoose');
const { env } = require("./env.config");
const dbConnection = () => {
    connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log('Database Connected Successful');
    })
        .catch((err) => {
        console.error('Database Connection Error:', err);
    });
};
exports.dbConnection = dbConnection;
