import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

EndOfSearchMessage();
noImageMessage();

function noImageMessage() {
  Notify.info('Sorry, there are no images matching your search query. Please try again.');
}
function EndOfSearchMessage() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}
