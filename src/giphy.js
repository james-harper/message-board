import axios from 'axios';

const Giphy = {};

Giphy.get = (q, limit = 5) => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      q,
      api_key: process.env.GIPHY_API_KEY,
      limit
    }
  })
};

export default Giphy;
