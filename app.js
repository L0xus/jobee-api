import express from 'express';
const app = express();
import { config } from 'dotenv';

import connectDatabase from './config/database.js'

// Set up config.env variables
config({path : './config/config.env'});

// Connecting to database
connectDatabase();

// Set up body parser
app.use(express.json());

// Importing all the routes
import jobs from './routes/jobs.js'
app.use('/api/v1', jobs);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});