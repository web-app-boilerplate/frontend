import logger from '../utils/logger'
import api from './api'

// Get user by ID
export const getUserById = async (id, token) => {
    const res = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

// Update user
export const updateUser = async (id, payload, token) => {
    const res = await api.put(`/users/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

// Get All Users

export const getAllUsers = async (token) => {
    const res = await api.get(`/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

