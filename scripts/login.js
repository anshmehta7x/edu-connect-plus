const serverURL = 'http://127.0.0.1:5000';

function openHomePage(emailaddress) {
    fetch(`${serverURL}/getid`,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailaddress})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        const uid = data['uid'];
        console.log(uid);
        window.location.href = "home.html?uid=" + encodeURIComponent(uid);
    })

    
  }

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('#emailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const submitButton = document.querySelector('#submitButton');
    const errorLabel = document.querySelector('#errorLabel');
    const newUser = document.querySelector('.login-register');

    submitButton.addEventListener('click', () => {

        const data = {
            email: emailInput.value,
            password: passwordInput.value
        };
        //login request
        fetch(`${serverURL}/login`,{
            method : 'POST',
            headers : {
                 'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data['status'] == 'success'){
                openHomePage(emailInput.value);
            }
            else{
                errorLabel.textContent = 'Wrong email or password';
            }
        })
    }
    )

    newUser.addEventListener('click', () => {
        window.location.href = "createprofile.html";
}
)

})

