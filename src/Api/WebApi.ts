import axios from 'axios';
const apiBaseURL = import.meta.env.VITE_APP_BASE_URL;

export default axios.create({
  baseURL: apiBaseURL,
});
