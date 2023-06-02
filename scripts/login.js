const serverURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('#emailInput');
    const passwordInput = document.querySelector('#passwordInput');
    const submitButton = document.querySelector('#submitButton');

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
                console.log('Login successful');
            }
            else{
                console.error('Login failed');
            }
        })
    }
    )
}
)

    

