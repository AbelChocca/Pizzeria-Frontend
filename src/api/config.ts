import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pizzeria-backend.up.railway.app',
    timeout: 5000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

export default api;