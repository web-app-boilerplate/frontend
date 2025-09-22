import axios from 'axios'

const api = axios.create({
    baseURL: '/api', // centralized
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api
