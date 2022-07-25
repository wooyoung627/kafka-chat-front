import axios from 'axios';

// const SERVER = "http://192.168.10.55:8080";
const SERVER = "http://localhost:8080";

export const apiClient = axios.create({
    baseURL: `${SERVER}`
})