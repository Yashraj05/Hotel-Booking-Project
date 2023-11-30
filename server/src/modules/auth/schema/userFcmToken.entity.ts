const mongoose = require('mongoose');

const userFcmTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the Users collection
    required: true
  },
  fcmToken: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const UserFcmTokenModel = mongoose.model('UserFcmToken', userFcmTokenSchema);

module.exports = UserFcmTokenModel;
