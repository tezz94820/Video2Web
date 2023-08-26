const express = require('express');
const app = express();
const cors = require('cors')
const indexRoute = require('./routes/indexRoute.js');
const helmet = require('helmet');
const xss = require('xss-clean')
const { sendSuccess } = require('./utils/apiResponse.js');


require('dotenv').config();


//parsing middleware
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))

//extra middlewares
app.use(cors());
app.use(helmet());
app.use(xss())

//routes
app.use('/',indexRoute);

app.listen(process.env.PORT , () => {
    console.log("server listening on port " + process.env.PORT);
});