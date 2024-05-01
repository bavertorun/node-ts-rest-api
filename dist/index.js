"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_config_1 = require("./config/env.config");
const db_config_1 = require("./config/db.config");
const index_route_1 = __importDefault(require("./routes/index.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
(0, db_config_1.dbConnection)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', index_route_1.default);
app.use('/user', user_route_1.default);
app.listen(env_config_1.env.PORT, () => {
    console.log(`Server listening on port ${env_config_1.env.PORT}`);
});
