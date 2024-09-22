import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
  return response.data;
};
