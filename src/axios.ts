import axios from 'axios';

const instance: any = axios.create({
    baseURL: 'http://localhost:4444',
});

type хз = { headers: { Authorization: string | null } };

instance.interceptors.request.use((config: хз) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
