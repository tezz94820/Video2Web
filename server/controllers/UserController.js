const catchAsync = require("../utils/catchAsync");
const { sendSuccess, sendError } = require("../utils/apiResponse.js");
const User = require('../models/User.js');



const createUsername = catchAsync(async (req, res, next) => {
    try {
      const { username } = req.query;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        // Username is not unique, respond with an error
        return sendError(res, 400, 'Username is already taken');
      }
  
      // Create a new user with the unique username
      const newUser = new User({
        username: username,
        links: [],
      });
  
      // Save the new user
      await newUser.save();
  
      sendSuccess(res, 200, 'Username created successfully', null);
    } catch (error) {
      console.error('Error:', error);
      sendError(res, 500, 'An error occurred', error);
    }
});
  



  const checkUsername = catchAsync(async (req, res, next) => {
    try {
      const {username} = req.query;
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        // Username is not unique, respond with an error
        return sendSuccess(res, 200, 'Username is Not Unique',{unique:false});
      }
    
    sendSuccess(res, 200, 'Username is Unique',{unique:true});
    
    } catch (error) {
      console.error('Error:', error);
      sendError(res, 500, 'An error occurred', error);
    }
  });

  const getAllLinks = catchAsync(async (req, res, next) => {
    try {
      const {username} = req.query;
      // Check if the username already exists
      const user = await User.findOne({ username });
  
      if (!user) {
        // Username is not unique, respond with an error
        return sendError(res, 200, 'user does not exist',null);
      }
    
    sendSuccess(res, 200, 'Username is Unique', {links:user.links});
    
    } catch (error) {
      console.error('Error:', error);
      sendError(res, 500, 'An error occurred', error);
    }
  });
module.exports = { createUsername, checkUsername, getAllLinks };
