import mongoose from 'mongoose';
import { StaffSchema } from './staff.schema';

const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        unique: true,
        required: [true, 'Room name filed is required']
    },
    hotel_description: {
        type: String,
        required: [true, 'Room description filed is required']
    },
    // Type of Media Files.
    media_files : [
        {
            url: {
                name : String,
                type: String,
            }
        }
    ],
   rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms'
    }],
    staff : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const HotelSchema =  mongoose.model('Hotel', hotelSchema);



