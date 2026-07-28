import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://localhost:44333/"
});

export default axiosInstance;