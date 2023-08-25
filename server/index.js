const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

//parsing middleware
app.use(express.json());

//extra middlewares
app.use(cors());

app.listen(process.env.PORT , () => {
    console.log("server listening on port " + process.env.PORT);
})