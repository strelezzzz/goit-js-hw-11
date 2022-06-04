import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
function EndOfSearchMessage() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

EndOfSearchMessage();
