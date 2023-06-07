const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_BJpIsIoNAdU3aQJUbtJgZNo21V3wN82fgBHtNO6FDX7ookqfLEZ9DOFtHicYSqoN';

export const fetchBreeds = () => {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
};

export const fetchCatByBreed = breedId => {
    return fetch(`${BASE_URL}/images/${breedId}?api_key=${API_KEY}`)
        .then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
};

