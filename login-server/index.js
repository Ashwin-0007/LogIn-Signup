require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();

PORT = process.env.PORT || 8001;


// MONGODB CONNECTIONS
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log(`MongoDB connected succesfully`))
.catch ((error) => console.log(`MongoDB connection error: ${error}`));


// MIDDLEWARES
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use('/user', userRouter);

// function to start server and  log the port number
app.listen(PORT, () => console.log(`Server started on ${PORT}`));