import { getFcmToken } from "../../firebase/notification";
import axios from 'axios'
export const loginViaEmail = async (email,password)=> {
    const fcmToken = await getFcmToken();
    const { data }  = await axios.post('http://192.168.1.38:3000/signin',{
        email,
        password,
        fcmToken
    })
    return data;
  };