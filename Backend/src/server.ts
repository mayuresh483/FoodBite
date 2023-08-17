import express from 'express';
import cors from 'cors';
import FoodRouter from './router/food.router';
import UserRoute from './router/user.router';
import OrderRoute from './router/order.router';
import dotenv from 'dotenv';
import { dbConnect } from './config/database.config';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

dbConnect();
// process.env.MONGO_URI;

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use(express.static('public'));

app.use(express.json());

app.use("/api/foods",FoodRouter);
app.use('/api/users',UserRoute);
app.use('/api/orders',OrderRoute);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.listen(port,()=>{
    console.log("App listening on port :"+port);
});

