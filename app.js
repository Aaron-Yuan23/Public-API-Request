
const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url){
    return fetch(url)
        // .then(res => console.log(res))
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log('Ooops there was a problem!', error))
}  

Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message; // getting first array
    const randomImage = data[1].message; // getting second array

    generateOptions(breedList);
    generateImage(randomImage);
})
// fetch use promises to handle result retuned from server

// fetch the entire list of dog breeds
// fetchData('https://dog.ceo/api/breeds/list')
//     .then(data => generateOptions(data.message))
     
// // fetch random image of breeds
// fetchData('https://dog.ceo/api/breeds/image/random')
//     .then(data => generateImage(data.message))



// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response){
    if(response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateImage(data){
    const html = 
    `<img src='${data}' alt>
    <p>Click to view Images of ${select.value}s</p>`;
    card.innerHTML = html;
}

function generateOptions(data){
    const options = data.map(item =>`
    <option value='${item}'>${item}</option>`).join(''); // options seperated with comma inserted into html
    select.innerHTML = options;
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p =card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        });
}



// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e){
    e.preventDefault(); // prevent default event to trigger automatically
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value; // using json place holder API (fake 500 posts)

    fetch('https://jsonplaceholder.typicode.com/comments',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json' //ensure data is encoded with json format
        },
        body: JSON.stringify({name: name, comment: comment})
        })// link of json place holder
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data))
}
