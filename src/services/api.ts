import type { SignupPayload, SignupResponse } from "@/src/types/api";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { authService } from "./authService";

// In a real app this would come from an environment variable (e.g. EXPO_PUBLIC_API_URL)
const BASE_URL = "https://artjoms-spole.fly.dev";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authService.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

export async function signup(payload: SignupPayload) {
  const res = await api.post<SignupResponse>("/signup", payload);
  return res.data;
}
