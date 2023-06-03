const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    const uid = parseInt(localStorage.getItem('uid'));
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const target = parseInt(searchParams.get('targetid'));

    const fname = document.querySelector('#user-first-name');
    const lname = document.querySelector('#user-last-name');
    const year = document.querySelector('#user-year');
    const branch = document.querySelector('#branch');
    const freeslotslist = document.querySelector('.free-slot-list');
    const currentsubslist = document.querySelector('.current-subjects-list');

    //get target user info
    fetch(`${serverURL}/getuser`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: target})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    }
    )
    .then(data => {
        const h = document.querySelector('#heading');
        h.innerHTML = `${data['firstName']}'s Profile`;
        fname.innerHTML = data['firstName'];
        lname.innerHTML = data['lastName'];
        year.innerHTML = data['clgYear'];
        branch.innerHTML = data['clgBranch'];

        const freeslots = JSON.parse(data['freeSlots']);
        freeslotslist.innerHTML = '';
        freeslots.forEach(slot => {
            const li = document.createElement('li');
            li.innerHTML = slot;
            freeslotslist.appendChild(li);
        })

        
        const currentsubs = JSON.parse(data['subCode']);
        currentsubslist.innerHTML = '';
        currentsubs.forEach(sub => {
            const li = document.createElement('li');
            li.innerHTML = sub;
            currentsubslist.appendChild(li);
        }
        )

        const imagename = `${target}.jpg`;
        const image = document.querySelector('#user-image');
        image.src = `${imagename}`;

    })
});