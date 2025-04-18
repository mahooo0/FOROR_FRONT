import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: 'https://back-foror.vercel.app/api/',
    // headers: { 'Content-Type': 'application/json' },
});

export default instanceAxios;
