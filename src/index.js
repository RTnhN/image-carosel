import './style.css';

function range(start, end) {
  return Array.apply(0, Array(end - 1))
    .map((element, index) => index + start);
}
/*
Under normal circumstance, the imageUrls would be the actual urls to images instead of
placeholder images
*/
const imageUrls = range(1, 11).map((number) => `http://placekitten.com/500/500?image=${number}`);

const cardsPlaceholder = document.createDocumentFragment();
const dotsPlaceholder = document.createDocumentFragment();

function makeImage(element, index) {
  const imageCard = document.createElement('div');
  imageCard.id = `img-${index + 1}`;
  imageCard.classList.add('card');
  if (index === 0) { imageCard.classList.add('shown'); }
  imageCard.appendChild(document.createElement('img'));
  imageCard.lastChild.setAttribute('src', element);
  cardsPlaceholder.appendChild(imageCard);
  dotsPlaceholder.appendChild(document.createElement('input'));
  dotsPlaceholder.lastChild.setAttribute('type', 'checkbox');
  dotsPlaceholder.lastChild.id = `imgHint-${index + 1}`;
  if (index === 0) { dotsPlaceholder.lastChild.checked = true; }
}

imageUrls.forEach(makeImage);

document.getElementById('photoDots').appendChild(dotsPlaceholder);
document.getElementById('cardsContainer').appendChild(cardsPlaceholder);

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const checkboxes = document.getElementById('photoDots');
const intervalTime = 2000;

function previousImage() {
  const currentImageDiv = document.querySelector('.shown');
  const currentImageId = Number(currentImageDiv.id.split('-')[1]);
  const previousImageIdNumber = currentImageId === 1
    ? imageUrls.length
    : currentImageId - 1;
  const previousImageDiv = document.getElementById(`img-${previousImageIdNumber}`);
  const currentImageCheckbox = document.getElementById(`imgHint-${currentImageId}`);
  const previousImageCheckbox = document.getElementById(`imgHint-${previousImageIdNumber}`);
  currentImageCheckbox.checked = false;
  previousImageCheckbox.checked = true;
  currentImageDiv.classList.remove('shown');
  previousImageDiv.classList.add('shown');
}

previousButton.addEventListener('click', previousImage);

function nextImage() {
  const currentImageDiv = document.querySelector('.shown');
  const currentImageId = Number(currentImageDiv.id.split('-')[1]);
  const nextImageIdNumber = currentImageId === imageUrls.length
    ? 1
    : currentImageId + 1;
  const nextImageDiv = document.getElementById(`img-${nextImageIdNumber}`);
  const currentImageCheckbox = document.getElementById(`imgHint-${currentImageId}`);
  const nextImageCheckbox = document.getElementById(`imgHint-${nextImageIdNumber}`);
  currentImageCheckbox.checked = false;
  nextImageCheckbox.checked = true;
  currentImageDiv.classList.remove('shown');
  nextImageDiv.classList.add('shown');
}

nextButton.addEventListener('click', nextImage);

function checkboxImage(e) {
  const currentImageDiv = document.querySelector('.shown');
  const currentImageId = Number(currentImageDiv.id.split('-')[1]);
  const nextImageId = Number(e.target.id.split('-')[1]);
  const nextImageDiv = document.getElementById(`img-${nextImageId}`);
  currentImageDiv.classList.remove('shown');
  nextImageDiv.classList.add('shown');
  const currentImageCheckbox = document.getElementById(`imgHint-${currentImageId}`);
  const nextImageCheckbox = document.getElementById(`imgHint-${nextImageId}`);
  currentImageCheckbox.checked = false;
  nextImageCheckbox.checked = true;
}

checkboxes.addEventListener('change', checkboxImage);

let intervalId = window.setInterval(nextImage, intervalTime);

function resetInterval() {
  window.clearInterval(intervalId);
  intervalId = window.setInterval(nextImage, intervalTime);
}

checkboxes.addEventListener('change', resetInterval);
previousButton.addEventListener('click', resetInterval);
nextButton.addEventListener('click', resetInterval);
