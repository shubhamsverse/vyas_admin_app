import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import userRoutes from './routes/userRoutes.js';

dotenv.config(); 

const app = express();


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));


app.use('/api/users', userRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
