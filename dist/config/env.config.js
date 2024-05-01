"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const envalid_1 = require("envalid");
(0, dotenv_1.configDotenv)();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    MONGODB_URI: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)({ default: 8080 })
});
