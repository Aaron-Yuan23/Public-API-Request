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
    userData.forEach(user =>{
        let Img = user.picture;
        let firstName = user.name.first;
        let lastName = user.name.last;
        let email = user.email;
        let location = user.location;

        card += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${Img.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${location.city},${location.state} state</p>
            </div>
        </div>`;
    });
    return card;
}


//get 12 random users
//const url = "https://randomuser.me/api/?results=12";

$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });