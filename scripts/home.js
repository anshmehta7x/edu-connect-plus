const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    const buddyButton = document.querySelector('.study-buddy-button-v');
    const tutorButton = document.querySelector('.mentor-button-v');
    var uidValue = parseInt(localStorage.getItem('uid'));
    
    fetch(`${serverURL}/getuser`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: uidValue})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    }
    )
    .then(data => {
        console.log(data);
    })

    buddyButton.addEventListener('click', () => {
        window.location.href = "profiles.html";
    })

    tutorButton.addEventListener('click', () => {
        window.location.href = "profiles.html";
    })

    const profilebtn = document.querySelector('.profile-button');
    profilebtn.addEventListener('click', () => {
        
        window.location.href = "editprofile.html";
    })

})