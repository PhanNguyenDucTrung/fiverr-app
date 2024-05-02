import axios from 'axios';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MCIsIkhldEhhblN0cmluZyI6IjE4LzA4LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyMzkzOTIwMDAwMCIsIm5iZiI6MTY5NDM2NTIwMCwiZXhwIjoxNzI0MDg2ODAwfQ.zVOvKMLttbVlutbb-QZ7FHPTdL-8JAIw50y_zo_SJ6w';

const axiosInstance = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn/api',
    headers: {
        accept: 'application/json',
        tokenCybersoft: token,
    },
});

export default axiosInstance;
