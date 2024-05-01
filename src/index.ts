import express from 'express'
import { env } from './config/env.config';
import {dbConnection} from './config/db.config';
import indexRouter from './routes/index.route'
import usersRouter from './routes/user.route'

dbConnection()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRouter);
app.use('/user',usersRouter);


app.listen(env.PORT, ()=>{
    console.log(`Server listening on port ${env.PORT}`);
});