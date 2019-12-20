$(document).ready(() => {
const gallery = document.getElementById("gallery");
const modalDiv = document.getElementById("modal-div");

//----------search bar-------------//
const searchHTML=`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
$(".search-container").append(searchHTML);

function generateUsers(userData){
    gallery.innerHtml= "";
    

    for(let i=0; i<userData.length; i++){
        gallery.innerHtml += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${userData[i].picture.thumbnail} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${userData[i].name.first} ${userData[i].name.last}</h3>
                <p class="card-text">${userData[i].email}</p>
                <p class="card-text cap">${userData[i].location.city}, ${userData[i].location.state}</p>
            </div>
        </div>`;
    }
    // userData.forEach(user =>{
    //     let img = user.picture;
    //     let firstName = user.name.first;
    //     let lastName = user.name.last;
    //     let email = user.email;
    //     let location = user.location;

    //     card += `
    //     <div class="card">
    //         <div class="card-img-container">
    //             <img class="card-img" src=${img.large} alt="profile picture">
    //         </div>
    //         <div class="card-info-container">
    //             <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
    //             <p class="card-text">${email}</p>
    //             <p class="card-text cap">${location.city}, ${location.state}</p>
    //         </div>
    //     </div>`;
    let profiles = document.querySelectorAll(".card");
    profiles.forEach(profile =>{
        profile.addEventListener("click", (e)=>{
            displayModal(parseInt(e.currentTarget.id), userData);
        });
    });

}

function createModal(index,userData){
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    //modalContainer.style.backgroundColor = generateRandomColor();
    modalContainer.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${userData[index].picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${userData[index].name.first} ${userData[index].name.last}</h3>
                <p class="modal-text">${userData[index].email}</p>
                <p class="modal-text cap">${userData[index].location.city}</p>
                <hr>
                <p class="modal-text">${userData[index].cell}</p>
                <p class="modal-text">${userData[index].location.street}, ${userData[index].location.state}, ${userData[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${userData[index].dob.date.substring(0, 10)}</p>
            </div>
        </div>`;

        document.querySelector('body').appendChild(modalContainer);

        // Remove modal window when 'X' button is clicked.
        document.querySelector('.modal-close-btn').addEventListener('click', () => {
            document.querySelector('body').removeChild(document.querySelector('.modal-container'));
        });
        
    // let modal = "";
    // userData.forEach(user =>{
    //     let img = user.picture;
    //     let name = user.name;
    //     let email = user.email;
    //     let location = user.location;
    //     let phone = user.phone;
    //     let street = user.location.street;
    //     let dob = user.dob;

    //     modal += `
    //     <div class="modal-container">
    //         <div class="modal">
    //             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //             <div class="modal-info-container">
    //                 <img class="modal-img" src="${img.large}" alt="profile picture">
    //                 <h3 id="name" class="modal-name cap">${name}</h3>
    //                 <p class="modal-text">${email}</p>
    //                 <p class="modal-text cap">${location.city}</p>
    //                 <hr>
    //                 <p class="modal-text">${phone}</p>
    //                 <p class="modal-text">${street}, ${location.state}, OR ${location.postcode}</p>
    //                 <p class="modal-text">Birthday: ${dob}</p>
    //             </div>
    //         </div>
    //     </div>`;
    // });
    // return modal;
    // modalDiv.innerHTML = modal;
    // modalDiv.style.display = "none";
}

    // function displayModal(){
    //     $(".card").on("click", (e)=>{
    //         const sibilings = $(e.target).parentsUntil(".gallery");
    //         let indexCard;

    //         if(sibilings.length === 0){
    //             indexCard = e.target;
    //         }
    //         else{
    //             indexCard = sibilings[sibilings.length -1];
    //         }

    //         const employeeName = $(indexCard).find(".card-info-container>h3").text();
    //         const currentModal = $(`.modal-container:has(h3:contains(${employeeName}))`);
    //         currentModal.show();
    //     });
    // }

//get 12 random users
//const url = "https://randomuser.me/api/?results=12";

$.getJSON('https://randomuser.me/api/?results=12&nat=ca&inc=picture,name,email,location,dob,phone', 
        data => {
            gallery.append(displayUsers(data.results));
            modalDiv.append(createModal(data.results));
            modalDiv.innerHTML = displayModal();
           
        });
});