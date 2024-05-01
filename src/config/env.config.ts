import { configDotenv } from 'dotenv';
import { cleanEnv,port,str } from "envalid";

configDotenv();

export const env = cleanEnv(process.env,{
    MONGODB_URI: str(),
    PORT: port({ default: 8080 })
})