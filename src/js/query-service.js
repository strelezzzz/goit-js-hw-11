const axios = require('axios').default;
// axios.<method> will now provide autocomplete and parameter typings
const API_KEY = '27866625-b1d432868176def00d18b4cdc';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horisontal',
  safesearch: 'true',
};

export const getImageService = {
  async fetchImages(query) {
    try {
      const { data } = await axios.get(`/?q=${query}&page=${this.page}&per_page=${this.per_page}`);
      return {
        hits: data.hits,
        total: data.totalHits,
        hasNextPage: this.page * this.per_page < data.totalHits,
      };
    } catch (error) {
      console.log('error: ', console.log(error));
    }
  },

  page: 1,
  per_page: 10,
  query: '',

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get input() {
    return this.query;
  },
  set input(newQuery) {
    this.query = newQuery;
  },
};
