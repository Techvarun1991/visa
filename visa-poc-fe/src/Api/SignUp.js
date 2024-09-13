import axios from "axios";
import API_BASE_URL from "./ApiConfig";

export const signUpApi = async (payload) => {
    const apiUrl = `${API_BASE_URL}/pharmacies/login`;
    const response = await axios.post(apiUrl, payload);
    return response;
}
