const endpoint = "https://api.thecatapi.com/v1/breeds";
const api_key = "live_6IXeD3H0M3y8XHiFwmnVGQVVo3858OviQpENPwYIRdOJZFcVAShXPYpZAKlsMdiL";

function getBreeds(query){
    return fetch (`${endpoint}?apiKey=${api_key}&q=${query}`)
            .then((res)=>res.json())
            .catch(error => console.error(error.message));
}
export default {getBreeds};


const breedSelect = document.querySelector(".breed-select");

breedSelect.addEventListener("select", ()=>{
    getBreeds()
    .then((breed)=>renderBreedList(breed))
    .catch((error)=> console.error(error.message));
})

// function fetchBreeds(){
//     return fetch("https://api.thecatapi.com/v1/breeds")
//     .then(response =>{
//         if(!response.ok){
//             throw new Error(response.message)
//         }
//         return response.json()
//     })
// }

function renderBreedList(breeds){
    const markUp = breeds.map((breed)=>{
        return
        `
        <option>${breed.id}</option>
        `;
    })
    .join("");
    breedSelect.innerHTML = markUp;
}

