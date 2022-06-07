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
  //перевірка на пусті рядки
  if (!getImageService.inputData) {
    message.noInput();
    form.reset();
    return;
  }
  //
  getImageService.fetchImages().then(({ hits, total, hasNextPage }) => {
    //перевірка на абрукадабру
    if (hits.length === 0) {
      message.noImage();
      form.reset();
      return;
    }
    message.count(total);
    GalleryBuilder(hits, hasNextPage);
  });
}
// ======function onLoadMore=====================================
function onLoadMore() {
  getImageService.incrementPage();
  getImageService.fetchImages().then(({ hits, hasNextPage }) => {
    simplelightbox.destroy();
    GalleryBuilder(hits, hasNextPage);
  });
}
// =======================================
function rebuildGalleryWithLightbox() {
  simplelightbox = new SimpleLightbox('.gallery a', {
    nav: true,
    showCounter: true,
    enableKeyboard: true,
  }).refresh();
}
// ===========================
function checkerOfNextPage(hasNextPage) {
  if (!hasNextPage) {
    message.EndOfSearch();
    loadMore.classList.add('visually-hidden');
  } else {
    loadMore.classList.remove('visually-hidden');
  }
}
// ======================
function GalleryBuilder(hits, hasNextPage) {
  renderGallery(hits);
  rebuildGalleryWithLightbox();
  checkerOfNextPage(hasNextPage);
}
