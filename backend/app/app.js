/************************* imports *************************/
import bodyParser from 'body-parser';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

/************************* setup config file *************************/
if (process.env.NODE_ENV !== 'production') {
   dotenv.config({path: 'backend/config/config.env'})
}
/************************* variables *************************/
const app = express();
colors.enabled = true;

/************************* middlewares *************************/
app.use(express.json({limit: '25mb'})); // for parsing application/json
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

/************************* import all routes *************************/
import homeRoute from '../routes/homeRoute.js';
import userRoutes from '../routes/userRoutes.js';
import productRoutes from '../routes/productRoutes.js';
import reviewRoutes from '../routes/reviewRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';

/****************************** routes ******************************/
app.use('/api/v1.0/', homeRoute);
app.use('/api/v1.0/users', userRoutes);
app.use('/api/v1.0/products', productRoutes);
app.use('/api/v1.0/reviews', reviewRoutes);
app.use('/api/v1.0/orders', orderRoutes);


export default app;