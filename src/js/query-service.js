const axios = require('axios').default;
// axios.<method> will now provide autocomplete and parameter typings
const API_KEY = '27866625-b1d432868176def00d18b4cdc';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horisontal',
  safesearch: 'true',
};

export class GetImages {
  constructor() {
    this.page = 1;
    this.per_page = 10;
  }
  async fetchImages(query) {
    const { data } = await axios.get(`/?q=${query}&page=${this.page}&per_page=${this.per_page}`);
    return {
      hits: data.hits,
      total: data.totalHits,
      hasNextPage: this.page * this.per_page < total,
    };
    // incrementPage(){ }
  }
}
