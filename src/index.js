import './sass/main.scss';
// ==========================================
import { getRefs } from './js/refs';
import { getImageService } from './js/query-service';
import { message } from './js/message';
import { renderGallery, clearGallery } from './js/markup';
const { form, loadMore } = getRefs();
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// -----------------------------------------
form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMore);
loadMore.classList.add('visually-hidden');
let simplelightbox;

// ======function onFormSubmit========================
function onFormSubmit(evt) {
  evt.preventDefault();
  clearGallery();
  getImageService.inputData = form.elements.searchQuery.value.trim();
  getImageService.resetPage();
  //
  if (!getImageService.inputData) {
    message.noInput();
    form.reset();
    return;
  }
  getImageService.fetchImages().then(({ hits, total, hasNextPage }) => {
    if (hits.length === 0) {
      message.noImage();
      form.reset();
      return;
    }
    if (hits.length < getImageService.per_page) {
      message.EndOfSearch();
      loadMore.classList.add('visually-hidden');
    }
    message.count(total);
    renderGallery(hits);

    if (hasNextPage) {
      loadMore.classList.remove('visually-hidden');
    }
    rebuildGallery();
  });
}
// ======function onLoadMore=====================================
function onLoadMore() {
  getImageService.incrementPage();
  getImageService.fetchImages().then(({ hits, hasNextPage }) => {
    renderGallery(hits);

    if (hasNextPage) {
      console.log(hasNextPage);
      renderGallery(hits);
    } else {
      message.EndOfSearch();
      loadMore.classList.add('visually-hidden');
    }
    rebuildGallery();
  });
}
// =======================================
function rebuildGallery() {
  simplelightbox = new SimpleLightbox('.gallery a', {
    spinner: true,
    nav: true,
    showCounter: true,
    enableKeyboard: true,
  }).refresh();
}
