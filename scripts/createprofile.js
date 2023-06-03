const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function() {
    localStorage.clear();

    const fname = document.querySelector('#fnameinp');
    const lname = document.querySelector('#lnameinp');
    const email = document.querySelector('#emailinp');
    const password = document.querySelector('#passwordinp');
    const confirmpassword = document.querySelector('#confirmpasswordinp');
    const timetable = document.querySelector('#timetableinp'); 
    const branch = document.querySelector('#branchcodeinp');
    const passyear = document.querySelector('#passyearinp');
    const submitbtn = document.querySelector('#submitbtn');
    const inputfile = document.getElementById('profile-pic-input');
    const profilepic = document.getElementById('profile-image');

    submitbtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (fname.value === '' || lname.value === '' || email.value === '' || password.value === '' || confirmpassword.value === '' || timetable.value === '' || branch.value === '' || passyear.value === '') {
            alert('Please fill all the fields');
        } else if (password.value !== confirmpassword.value) {
            alert('Passwords do not match');
        } else {
            fetch(`${serverURL}/login`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': email.value}),  
            })
            .then(response => response.json())
            .then(data => {
                if(data['exists'] === 1) {
                    alert('Email already exists');
                    email.textContent = '';
                }
                else {
                    const dat = {
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
                        body: JSON.stringify(dat),
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
                            localStorage.setItem('uid', uid);
                            window.location.href = "home.html";
                        })
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
                })
            
        }
    });

    inputfile.onchange = function(event) {
        event.preventDefault();
        const file = inputfile.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${serverURL}/uploadnew`);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('Image uploaded successfully!');
            } else {
                console.error('Error uploading image:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error uploading image:', xhr.statusText);
        };
        xhr.send(formData);
        profilepic.src = URL.createObjectURL(file);
    };
    
    }
)