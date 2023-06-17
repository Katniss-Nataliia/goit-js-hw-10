const endpoint = "https://api.thecatapi.com/v1/breeds";
const api_key = "live_6IXeD3H0M3y8XHiFwmnVGQVVo3858OviQpENPwYIRdOJZFcVAShXPYpZAKlsMdiL";

const breedSelect = document.querySelector(".breed-select");

breedSelect.addEventListener("change", () => {
    const selectedBreed = breedSelect.value;
    fetchBreeds()
    .then(breeds => renderBreedList(breeds, selectedBreed))
    .catch(error => console.error(error.message))
})

// Function to fetch breeds from the Cat API based on a query

function getBreeds(query){
    return fetch (`${endpoint}?apiKey=${api_key}&q=${query}`)
            .then(res => res.json())
            .catch(error => console.error(error.message));
}

function fetchBreeds(){
    return fetch(endpoint)
    .then(response => {
        if(!response.ok){
            throw new Error(response.message)
        }
        return response.json()
    });
}

function renderBreedList(breeds,selectedBreed){
    const breedOptions = breeds.map(breed => {
        return `
        <option value="${breed.id}" 
        ${breed.id === selectedBreed ? 'selected' : ''}>
        ${breed.name}
        </option>
    `
    });

    breedSelect.innerHTML = breedOptions.join('');
}

// fetch and render the initial breed list when page loads 

fetchBreeds()
    .then(breeds => renderBreedList(breeds))
    .catch(error => console.error(error.message))


//// Information about a cat

breedOptions.addEventListener('select', fetchCatByBreed);

function fetchCatByBreed(breedId){
    
}