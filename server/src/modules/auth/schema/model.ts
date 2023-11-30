import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'User name filed is required']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email filed is required']
    },
    password: {
      type: String,
      required: [true, 'Password filed is required'],
    },
    facebookId: {
      type: String,
      unique : true,
      default : null
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
    },

 });

export const userModel =  mongoose.model('Users', usersSchema);

