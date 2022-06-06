import { Notify } from 'notiflix/build/notiflix-notify-aio';
// =======message-functions=========================
export const message = {
  noImage() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  },

  EndOfSearch() {
    Notify.failure("We're sorry, but you've reached the end of search results.");
  },

  count(totalHits) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
  },
  noInput() {
    Notify.warning('Please give me one more chance and I will find some pictures for you');
  },
};
