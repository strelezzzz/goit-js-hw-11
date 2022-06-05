import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;
// =======================================================
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMore);
const API_KEY = '27866625-b1d432868176def00d18b4cdc';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horisontal',
  safesearch: 'true',
};
let page = 1;
const per_page = 40;
// ==========================function fetchImages===============================================
async function fetchImages(query) {
  const { data } = await axios.get(`/?q=${query}&page=${page}&per_page=${per_page}`);
  // console.log('totalHits = ', data.totalHits, data.hits);
  return {
    hits: data.hits,
    total: data.totalHits,
    // hasNextPage: this.page * this.per_page < total,
  };
}
// ==========================function onFormSubmit==========================================
async function onFormSubmit(evt) {
  evt.preventDefault();
  const input = form.elements.searchQuery.value.trim();
  loadMore.hidden = false;
  page = 1;
  if (!input) {
    noInput();
    form.reset();
    return;
  }
  const response = await fetchImages(input);
  const { total, hits } = response;

  console.log(hits);
  if (hits.length === 0) {
    noImageMessage();
    return;
  }
  countMessage(total);
}
// =========================message-functions==================================================
function noImageMessage() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function EndOfSearchMessage() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}

function countMessage(totalHits) {
  Notify.info(`Hooray! We found ${totalHits} images.`);
}
function noInput() {
  Notify.warning('Please give me one more chance and I will find some pictures for you');
}
// =============================================================================================
async function onLoadMore(evt) {
  console.log(evt.target);
  const input = form.elements.searchQuery.value.trim();

  page += 1;
  const response = await fetchImages(input); //тут await можна не писати, бо він один?
  const { total, hits } = response;
  if (total - per_page * page >= -1) {
    console.log(total - per_page * page);
    console.log(hits);
    return;
  } else {
    EndOfSearchMessage();
    loadMore.hidden = true;
  }
}
