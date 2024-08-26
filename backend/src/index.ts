import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

import myUserRoute from './routes/myUserRoute'
import myRestaurantRoute from './routes/myRestaurantRoute';
import restaurantRoute from './routes/restaurantRoute';
import orderRoute from './routes/orderRoute';

connectDb();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.use('/api/order/checkout/webhook', express.raw({ type: "*/*"}));
app.use(express.json());

app.get('/health', async (req: Request, res: Response) => {
    res.send({message: "Health Ok!"});
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

app.listen(port, () => {
    console.log(`Server Running on PORT: ${port}`);
});