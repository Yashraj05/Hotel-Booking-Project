import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userName: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'User name filed is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email filed is required'],
      validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password filed is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'merchant' , 'staff'],
      default: 'user'
    },
    accountId:{
        type: String,
        default : null
    },
    customerid: {
        type : String,
        default : null
    },
    designation: {
        type : String,
        default : null
    },
    hotelId : {
        type : String,
        default : null
    }

 });
  module.exports = mongoose.model('Users', usersSchema);

