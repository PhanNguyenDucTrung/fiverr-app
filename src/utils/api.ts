import axios from 'axios';

// Set up a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface Category {
    id?: number;
    name: string;
}

export const getCategoryList = () => {
    return apiClient.get<Category[]>('/categories');
};

export const addCategory = (category: Category) => {
    return apiClient.post('/categories', category);
};

export const updateCategory = (id: number, category: Category) => {
    return apiClient.put(`/categories/${id}`, category);
};

export const deleteCategory = (id: number) => {
    return apiClient.delete(`/categories/${id}`);
};
