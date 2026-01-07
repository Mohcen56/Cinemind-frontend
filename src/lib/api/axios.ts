import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/`,
  // Enable credentials to send/receive HTTP-only cookies
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// No need for request interceptor - cookies are sent automatically
// with withCredentials: true

export default api;
