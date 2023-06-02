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
        //console.log(uid);
        window.location.href = "home.html?uid=" + encodeURIComponent(uid);
    })
    
  }

// document.addEventListener('DOMContentLoaded', () => {
//     const emailInput = document.querySelector('#emailInput');
//     const passwordInput = document.querySelector('#passwordInput');
//     const submitButton = document.querySelector('#submitButton');
//     const errorLabel = document.querySelector('#errorLabel');
//     const newUser = document.querySelector('.login-register');

//     console.log('DOM loaded');

//     newUser.addEventListener('click', () => {
//         window.location.href = "createprofile.html";
// }
// )

// document.addEventListener('submit', () => {
//     const email = emailInput.value.toString();
//     const password = passwordInput.value;

//     const data = {email, password};

//     //login request
//     console.log('Sending login request...');
//     fetch(`${serverURL}/login`,{
//         method : 'POST',
//         headers : {
//              'Content-Type': 'application/json'
//          },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not OK');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Login request successful!');
//         if(data['status'] == 'success'){
//             console.log('Opening home page...');
//             openHomePage(emailInput.value);
//         }
//         else{
//             errorLabel.textContent = 'Wrong email or password';
//         }
//     })
// })
// })

document.addEventListener('DOMContentLoaded', () => {
    // ...
  
    const loginForm = document.querySelector('#loginForm');
    
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission
    
      const email = emailInput.value.toString();
      const password = passwordInput.value;
    
      const data = { email, password };
    
      // login request
      console.log('Sending login request...');
      fetch(`${serverURL}/login`, {
          method: 'POST',
          headers: {
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
          console.log('Login request successful!');
          if (data['status'] == 'success') {
            console.log('Opening home page...');
            openHomePage(emailInput.value);
          } else {
            errorLabel.textContent = 'Wrong email or password';
          }
        })
        .catch(error => {
          console.error('An error occurred:', error);
          errorLabel.textContent = 'An error occurred during login';
        });
    });
  });
  