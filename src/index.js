import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import GetImages from './js/query-service';
// const images = new GetImages();

// import * as GetImages from '.js/query-service';

const form = document.querySelector('.search-form');
console.log(searchForm);

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
}

EndOfSearchMessage();
noImageMessage();

function noImageMessage() {
  Notify.info('Sorry, there are no images matching your search query. Please try again.');
}
function EndOfSearchMessage() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}
