
const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function() {
        const fname = document.querySelector('#fnameinp');
        const lname = document.querySelector('#lnameinp');
        const email = document.querySelector('#emailinp');
        const branch = document.querySelector('#branchcodeinp');
        const passyear = document.querySelector('#passyearinp');
        var searchString = window.location.search;
        var searchParams = new URLSearchParams(searchString);
        var uidValue = searchParams.get('uid');
        console.log(uidValue);

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
            fname.value = data['firstName'];
            lname.value = data['lastName'];
            email.value = data['userEmail'];
            passyear.value = data['clgYear'];
            branch.value = data['clgBranch'];
        })

        
})
