const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');

const loginLoader = document.querySelector('.loginLoader');

const loginUrl = 'https://limelight-fastfood.herokuapp.com/api/v1/auth/login';


const loginUser = (event) => {
  event.preventDefault();
  const info = {
    email: email.value,
    password: password.value
  };
  const msgDiv = document.querySelector('.msg-div');
  loginLoader.style.display = 'block';
  fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'Error') {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loginLoader.style.display = 'none';
        msgDiv.innerHTML = data.message;
      } else if (data.status === 'Success') {
        localStorage.setItem('fastfoodfast', data.token);
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'green';
        loginLoader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        window.location.href = './index.html';
      } else {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loginLoader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        window.location.href = './login.html';
      }
    }).catch((error) => {
      throw error;
    });
};


loginBtn.addEventListener('click', loginUser);