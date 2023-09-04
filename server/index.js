const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const indexRoute = require('./routes/indexRoute.js');
const helmet = require('helmet');
const xss = require('xss-clean')
const { sendSuccess } = require('./utils/apiResponse.js');
const mongoose = require('mongoose');


require('dotenv').config();


//parsing middleware
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))

//extra middlewares
app.use(cors());
app.use(helmet());
app.use(xss())
app.use(morgan('dev'));
app.use(mongoSanitize());

//routes
app.use('/',indexRoute);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen( port, () =>   console.log(`Listening on port ${port}`) )
    } catch (error) {
        console.log(error.message)
    }
}
start()