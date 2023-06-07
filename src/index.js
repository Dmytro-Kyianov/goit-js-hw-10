import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './style.css';

const breedSelectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');

breedSelectEl.addEventListener('change', onBreedChange);

Notiflix.Loading.circle('Loading data, please wait...');

 fetchBreeds()
      .then(breeds => {
        Notiflix.Loading.remove();
        loaderEl.classList.remove('is-hidden');
        renderBreedList(breeds);
        new SlimSelect({
          select: '#single'
        })
    })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        breedSelectEl.classList.remove('is-hidden');
        loaderEl.classList.add('is-hidden');
      })


function renderBreedList(breeds){
  breedSelectEl.innerHTML = breeds.map(breed => {
    return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
  }).join('');
}

function onBreedChange(e){
  loaderEl.classList.remove('is-hidden');
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
      .then(breed => {
        renderCatCard(breed);
        Notiflix.Loading.remove();
        catInfoEl.classList.remove('is-hidden');
        catInfoEl.classList.add('open-box')
    })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(()=> loaderEl.classList.add('is-hidden'));

}

function renderCatCard (breed){
  catInfoEl.innerHTML = '';
  const createImg = `<img class="cat-picture" width=400 src="${breed.url}" alt="Current cat">`;
  const createInfo = `<div><h1 class="cat-name">${breed.breeds[0].name}</h2><p class="cat-description">${breed.breeds[0].description}</p><p class="cat-temperament"><b>Temperament:</b> ${breed.breeds[0].temperament}</p></div>`;
  catInfoEl.insertAdjacentHTML('beforeend', createImg);
  catInfoEl.insertAdjacentHTML('beforeend', createInfo);
 
}