// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.32.121/api', 
});

export const translateText = async (text) => {
  try {
    const response = await api.post('/pay', { text });
    return response.data.translatedText;
  } catch (error) {
    throw error;
  }
};
