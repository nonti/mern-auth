import express from 'express';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

//Initiate express app
const app = express();

//Load environment variables from.env file
dotenv.config();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
const PORT = process.env.PORT || 4000;

//DB connection
connectDB();

//Routes
app.use('/api/auth', authRoutes);

//Server configuration
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

