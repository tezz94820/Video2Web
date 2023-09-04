const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'please provide username'],
        maxLength: [20,'username cannot exceed 20 characters'],
        unique: true
    },
    links:[
        {
            type: String
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;