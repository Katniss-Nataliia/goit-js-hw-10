const endpoint = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6IXeD3H0M3y8XHiFwmnVGQVVo3858OviQpENPwYIRdOJZFcVAShXPYpZAKlsMdiL';

const breedSelect = document.querySelector('.breed-select');

breedSelect.addEventListener('change', () => {
  const selectedBreed = breedSelect.value;
  fetchBreeds()
    .then(breeds => renderBreedList(breeds, selectedBreed))
    .catch(error => console.error(error.message));
});

// Function to fetch breeds from the Cat API based on a query
function getBreeds(query) {
  return fetch(`${endpoint}?apiKey=${api_key}&q=${query}`)
    .then(res => res.json())
    .catch(error => console.error(error.message));
}

function fetchBreeds() {
  return fetch(endpoint).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}

function renderBreedList(breeds, selectedBreed) {
  const breedOptions = breeds.map(breed => {
    return `
          <option value="${breed.id}" 
          ${breed.id === selectedBreed ? 'selected' : ''}>
          ${breed.name}
          </option>
        `;
  });

  breedSelect.innerHTML = breedOptions.join('');
}

// fetch and render the initial breed list when the page loads
fetchBreeds()
  .then(breeds => renderBreedList(breeds))
  .catch(error => console.error(error.message));

breedSelect.addEventListener('change', fetchCatByBreed);

function fetchCatByBreed() {
  const breedId = breedSelect.value;

  getBreeds(breedId)
    .then(({ breeds }) => {
      const markup = breeds.reduce(
        (markup, breed) => createMarkup(breed) + markup,
        ''
      );
      updateBreedsList(markup);
    })
    .catch(onError);
}

function createMarkup({ name, description, temperament, urlImage }) {
  return `
        <div class='breed-card'>
          <h2 class="breed-name">${name}</h2>
          <p class="breed-description">${description}</p>
          <p class="breed-temperament">${temperament}</p>
          <img class="breed-image" src=${urlImage}>
        </div>
      `;
}

function updateBreedsList(markup) {
  document.getElementById('breedArticle').innerHTML = markup;
}

function onError() {
  return "p.error";
}