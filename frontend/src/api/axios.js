import axios from 'axios'
// const BASE_URL = 'http://127.0.0.1:5000/v1';
// const BASE_URL = 'http://192.168.123.249:5000/v1';
const BASE_URL = 'https://dq7jqs-5000.csb.app/v1'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
