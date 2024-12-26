import axios from 'axios';
const http = axios.create();
http.defaults.baseURL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token') || '';
http.defaults.headers['Authorization'] = token;

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
});
export default http;