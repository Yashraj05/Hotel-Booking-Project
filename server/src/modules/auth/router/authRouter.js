import express from 'express';
import signup from '../controllers/authController.js'

export const auth_router = express.Router();
// For Auth
auth_router.post('/signup' , signup);

// module.exports = auth_router;
// export default auth_router;