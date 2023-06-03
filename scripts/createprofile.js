const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function() {
    const fname = document.querySelector('#fnameinp');
    const lname = document.querySelector('#lnameinp');
    const email = document.querySelector('#emailinp');
    const password = document.querySelector('#passwordinp');
    const confirmpassword = document.querySelector('#confirmpasswordinp');
    const timetable = document.querySelector('#timetableinp'); 
    const branch = document.querySelector('#branchcodeinp');
    const passyear = document.querySelector('#passyearinp');

    const submitbtn = document.querySelector('#submitbtn');
    submitbtn.addEventListener('click', function() {
        if (fname.value === '' || lname.value === '' || email.value === '' || password.value === '' || confirmpassword.value === '' || timetable.value === '' || branch.value === '' || passyear.value === '') {
            alert('Please fill all the fields');
        } else if (password.value !== confirmpassword.value) {
            alert('Passwords do not match');
        } else {
            const data = {
                firstName: fname.value,
                lastName: lname.value,
                clgYear: passyear.value,
                userEmail: email.value,
                userPassword: password.value,
                timetable: timetable.value,
                clgBranch: branch.value,
                lookingForBuddy: 0,
                lookingToTutor: 0,
                userGender:0,
                canTutor: [],
            };
            fetch(`${serverURL}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                fetch(`${serverURL}/getid`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'email': email.value}),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    const uid = data['uid'];
                    window.location.href = "home.html?uid=" + encodeURIComponent(uid);
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
}
)   