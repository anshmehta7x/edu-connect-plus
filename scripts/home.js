const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    var searchString = window.location.search;
    var searchParams = new URLSearchParams(searchString);
    var uidValue = searchParams.get('uid');
    
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

    const profilebtn = document.querySelector('.profile-button');
    profilebtn.addEventListener('click', () => {
        window.location.href = "editprofile.html?uid=" + encodeURIComponent(uidValue);
    })


    

    
    
})