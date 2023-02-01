import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://geonote.onrender.com/api',
});

export default instance;
