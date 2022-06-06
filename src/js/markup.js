import { getRefs } from './refs';
const { gallery } = getRefs();
// ============================
export function renderGallery(images) {
  const imageCard = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads } /* html */) =>
        `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" />
        <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`,
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', imageCard);
}
export function clearGallery() {
  gallery.innerHTML = '';
}
