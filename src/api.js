import axios from "axios";

const API = axios.create({ baseURL: 'https://rescanpre.onrender.com/V1/', });
// const API = axios.create({ baseURL: 'http://127.0.0.1:8000/V1/', });

export const get_booking_status = async (send_data) => {
    try {
        const response = await API.post(`booking_status`, send_data);
        return response.data;
    } catch (e) {
        throw e;
    }
};