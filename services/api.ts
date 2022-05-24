import { create } from "apisauce";
import { DEFAULT_API_CONFIG } from "./api-config";

export const api = create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})