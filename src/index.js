import './sass/main.scss';
// ==========================================
import { getRefs } from './js/refs';
const { form, loadMore } = getRefs();
import { getImageService } from './js/query-service';
import { message } from './js/message';
import { renderGallery } from './js/markup';
console.log(renderGallery);
// -----------------------------------------
form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMore);
loadMore.hidden = true;
// ======function onFormSubmit========================
function onFormSubmit(evt) {
  evt.preventDefault();
  const input = form.elements.searchQuery.value.trim();
  loadMore.hidden = false;
  getImageService.resetPage();
  if (!input) {
    message.noInput();
    form.reset();
    return;
  }
  getImageService.fetchImages(input).then(({ hits }) => {
    console.log(hits);
    renderGallery(hits);
    if (hits.length === 0) {
      message.noImage();
      return;
    }
    message.count(total);
  });
  // const { total, hits } = response;

  // console.log(hits);
}
// =============================================================================================
async function onLoadMore() {
  getImageService.incrementPage();

  const input = form.elements.searchQuery.value.trim();

  const response = await getImageService.fetchImages(input); //тут await можна не писати, бо він один?
  const { total, hits, hasNextPage } = response;

  if (hasNextPage) {
    console.log(hasNextPage);
    console.log(hits);

    return;
  } else {
    message.EndOfSearch();
    loadMore.hidden = true;
  }
}
