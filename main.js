$(document).ready(() => {
const gallery = document.getElementById("gallery");

//----------search bar-------------//
const searchContainer = document.querySelector(".search-container");
const searchHTML=`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
searchContainer.innerHTML= searchHTML;

function displayUsers(userData){
    let card = "";
    (userData).forEach(user =>{
        let img = user.picture;
        let firstName = user.name.first;
        let lastName = user.name.last;
        let email = user.email;
        let location = user.location;

        card += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${img.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${location.city}, ${location.state}</p>
            </div>
        </div>`;
    });
    gallery.innerHTML = card;
}

function createModal(userData){
    let modal = "";
    userData.forEach(user =>{
        let img = user.picture;
        let name = user.name;
        let email = user.email;
        let location = user.location;
        let phone = user.phone;
        let street = user.location.street;
        let dob = user.dob;

        modal += `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${img.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street}, ${location.state}, OR ${location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>
            </div>
        </div>`;
    });
    return modal;
}


//get 12 random users
//const url = "https://randomuser.me/api/?results=12";

$.getJSON('https://randomuser.me/api/?results=12&nat=ca&inc=picture,name,email,location,dob,phone', 
        data => {
            displayUsers(data.results);
            createModal(data.results);
            console.log(data.results);
        });
});