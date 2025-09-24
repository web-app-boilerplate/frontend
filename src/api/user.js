import logger from '../utils/logger'
import api from './api'

// Get user by ID
export const getUserById = async (id) => {
    const res = await api.get(`/users/${id}`)
    return res.data
}

// Update user
export const updateUser = async (id, payload) => {
    const res = await api.put(`/users/${id}`, payload)
    return res.data
}

// Delete user
export const deleteUser = async (id) => {
    const res = await api.delete(`/users/${id}`)
    return res.data
}

// Get All Users

export const getAllUsers = async () => {
    const res = await api.get(`/users/all`)
    return res.data
}

