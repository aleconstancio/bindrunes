import { createApiClient } from "bindrunes";

export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
