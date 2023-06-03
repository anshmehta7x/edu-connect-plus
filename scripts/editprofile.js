
const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function() {
        const fname = document.querySelector('#fnameinp');
        const lname = document.querySelector('#lnameinp');
        const email = document.querySelector('#emailinp');
        const branch = document.querySelector('#branchcodeinp');
        const passyear = document.querySelector('#passyearinp');
        const timetable = document.querySelector('#timetableinp');

        var uidValue = parseInt(localStorage.getItem('uid'));
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

            const updatebtn = document.querySelector('#updatebtn');
            updatebtn.addEventListener('click', function() {
                fetch(`${serverURL}/profile`,{
                    method : 'PUT',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({uid: uidValue, firstName: fname.value, lastName: lname.value, userEmail: email.value,timetable:timetable.value ,clgBranch: branch.value, clgYear: passyear.value,subCode: data['subCode'], userGender: data['userGender'],freeSlots: data['freeSlots'],lookingForBuddy: data['lookingForBuddy'],lookingToTutor: data['lookingToTutor'],canTutor: data['canTutor']})
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.json();
                })
                .then(dat => {
    
                    alert('Profile Updated');
            })
            })
        })

        const deletebtn = document.querySelector('#deletebtn');
        deletebtn.addEventListener('click', function() {
            fetch(`${serverURL}/profile`,{
                method : 'DELETE',
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
            })
            .then(data => {
                console.log(data);
                alert('Profile Deleted');
                localStorage.removeItem('uid');
                window.location.href = 'login.html';
        })
        })


        
})
