const endpoint = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6IXeD3H0M3y8XHiFwmnVGQVVo3858OviQpENPwYIRdOJZFcVAShXPYpZAKlsMdiL';

const breedSelect = document.querySelector('.breed-select');
const pError = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

pError.style.display = "none"

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

function fetchCatByBreed(breedId) {
    breedId = breedSelect.value;
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    loader.style.display = 'block';

    return fetch(url, {
        headers:
        {
            'x-api-key': api_key,
        },
    })
    .then(response => {
        if (!response.ok){
            throw new Error(response.message);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const catImagesMarkup = data.map(cat => 
            createMarkup(cat)).join('');
        
        loader.style.display = 'none';
        updateCatInfo(catImagesMarkup);
    })
    .catch(onError);
}

function createMarkup(cat) {
    
  return `
        <div class='breed-card'>
          <h2 class="breed-name">${cat.breeds[0]}</h2>
          <p class="breed-description">${description}</p>
          <p class="breed-temperament">${temperament}</p>
          <img class="breed-image" src=${url}>
        </div>
      `;
}

function updateCatInfo(markup) {
  catInfo.innerHTML = markup;
}

function onError() {
  return pError.style.display="block"; 
  

}