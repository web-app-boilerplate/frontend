import axios from "axios";
import logger from "../utils/logger";
import api from "./api";

export const login = async (email, password) => {
    const response = await api.post(`/auth/login`, { email, password });
    return response.data; // { token, user }
};

export const register = async (email, password, name) => {
    const response = await api.post(`/auth/register`, { email, password, name });
    return response.data;
};

export const refreshToken = async (token) => {
    const response = await api.post(`/auth/refresh-token`, { token });
    return response.data;
};
