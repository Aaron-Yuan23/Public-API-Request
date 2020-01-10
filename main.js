



//----------search bar-------------//

document.querySelector('.search-container').innerHTML = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;


function generateProfile(profileData){
    const gallery = document.getElementById("gallery");
    gallery.innerHTML="";
    //create each user card 
    for(let i=0; i<profileData.length; i++){
        gallery.innerHTML +=`<div class="card" id="${i}">
        <div class="card-img-container">
            <img class="card-img" src="${profileData[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${profileData[i].name.first} ${profileData[i].name.last}</h3>
            <p class="card-text">${profileData[i].email}</p>
            <p class="card-text cap">${profileData[i].location.city}, ${profileData[i].location.state}</p>
        </div>
    </div>`;
    }

    //add event listeners to each card

    let profiles = document.querySelectorAll(".card");
    profiles.forEach(profile =>{
        profile.addEventListener("click", (e)=>{
            displayModal(parseInt(e.currentTarget.id), profileData);
        });
    });
}

function displayModal(index, userData){

    let modalContainer = document.createElement("div");
    modalContainer.className = `modal-container`;
    modalContainer.innerHTML = 
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${userData[index].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${userData[index].name.first} ${userData[index].name.last}</h3>
                <p class="modal-text">${userData[index].email}</p>
                <p class="modal-text cap">${userData[index].location.city},${userData[index].location.state}</p>
                <hr>
                <p class="modal-text">${userData[index].phone}</p>
                <p class="modal-text">${userData[index].location.street.number},${userData[index].location.street.name}, ${userData[index].location.state}, ${userData[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${userData[index].dob.date.substring(0,10)}</p>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`;
    document.querySelector("body").appendChild(modalContainer);

    // x button to remove the modal
    const x = document.querySelector(".modal-close-btn");
    x.addEventListener("click", ()=>{ 
        document.querySelector("body").removeChild(modalContainer);
    });

    //implement logic for prev and next buttons
    const buttons = document.querySelectorAll('.modal-btn-container button');
    addOrRemoveButtons(index, userData, buttons);
    const prev = document.querySelector(".modal-btn-container #modal-prev");
    prev.addEventListener("click", ()=>{
            document.querySelector('body').removeChild(modalContainer);
            displayModal(index - 1, userData);
    });

    const next = document.querySelector(".modal-btn-container #modal-next");
    next.addEventListener("click", ()=>{
        document.querySelector('body').removeChild(modalContainer);
            displayModal(index + 1, userData);
    });
}

    //remove prev button from the first card and remove next button from the last card
    function addOrRemoveButtons(currentProfile, userData, buttons){
        if (currentProfile === 0){
            buttons[0].style.visibility = 'hidden';
            buttons[1].style.visibility = 'visible';
        } else if (currentProfile=== userData.length -1){
            buttons[0].style.visibility = 'visible';
            buttons[1].style.visibility = 'hidden';
        }
    }


    const searchProfiles = (input, data) => {

        // Empty existing filtered array.
        filteredProfiles = [];
    
        // If a modal window exists, remove it.
        if(document.querySelector('.modal-container')){
            document.querySelector('body').removeChild('.modal-container');
        }
        // Filtering process, pushes matching profiles to filteredProfiles array.
        data.forEach(profile => {
            if (profile.name.first.toLowerCase().includes(input) || profile.name.last.toLowerCase().includes(input)){
                filteredProfiles.push(profile);
            }
        });
    
        // Display or remove error message as required.
        displayOrRemoveErrorMessage(filteredProfiles);
        
        // Generate new profile cards using filteredProfiles array of objects.
        generateProfile(filteredProfiles);
    }
    
    // display text if there is no result match
    function displayOrRemoveErrorMessage(results){
        if(results.length === 0) {
            if(document.querySelector('.errorMessage') === null){
                let noResultsFound = document.createElement('p');
                noResultsFound.className = 'errorMessage';
                noResultsFound.textContent = 'No results found. Try again.';
                document.querySelector('body').insertBefore(noResultsFound, gallery);
            }      
        } else {
            if(document.querySelector('.errorMessage') !== null){
                document.querySelector('.errorMessage').style.display = 'none';
            }       
        }
    }

//get 12 random users
fetch('https://randomuser.me/api/?results=12&nat=ca&inc=picture,name,email,location,dob,phone')
.then(data => data.json())
.then(data =>{
    generateProfile(data.results);
    
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        searchProfiles(e.target.firstElementChild.value.toLowerCase(), data.results);
    });
    
});


