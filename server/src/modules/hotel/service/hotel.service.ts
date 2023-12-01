import { Request } from 'express';
import { Service } from 'typedi';

@Service()
export class HotelService {
    createHotel = (req: Request,res : Response)=>{
        console.log("i AM CALLED");
    }
}