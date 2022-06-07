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
  //
  getImageService.fetchImages().then(({ hits, total, hasNextPage }) => {
    if (hits.length === 0) {
      message.noImage();
      form.reset();
      return;
    }
    message.count(total);
    renderGallery(hits);
    rebuildGallery();
    checkerOfNextPage(hasNextPage);
  });
}
// ======function onLoadMore=====================================
function onLoadMore() {
  getImageService.incrementPage();
  getImageService.fetchImages().then(({ hits, hasNextPage }) => {
    simplelightbox.destroy();
    renderGallery(hits);
    rebuildGallery();
    checkerOfNextPage(hasNextPage);
  });
}
// =======================================
function rebuildGallery() {
  simplelightbox = new SimpleLightbox('.gallery a', {
    nav: true,
    showCounter: true,
    enableKeyboard: true,
  }).refresh();
}

function checkerOfNextPage(hasNextPage) {
  if (!hasNextPage) {
    message.EndOfSearch();
    loadMore.classList.add('visually-hidden');
  } else {
    loadMore.classList.remove('visually-hidden');
  }
}
