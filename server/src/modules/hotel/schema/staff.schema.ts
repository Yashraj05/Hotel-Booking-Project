import mongoose from "mongoose";
import { HotelSchema } from "./hotel.schema";

    const staffSchema = new mongoose.Schema({
        designation: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'designation filed is required']
        },
        fullName: {
            type: String,
            required: [true, 'Full name filed is required']
        },
        hotel_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true , 'Hotel id is required field']
        },
    });
    
    module.exports = mongoose.model('Staff', staffSchema);
