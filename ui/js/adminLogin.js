const adminBtn = document.querySelector('.adminLogin-Btn');
const loginLoader = document.querySelector('.loginLoader');
const email = document.getElementById('email');
const password = document.getElementById('password');

const loginUrl = 'https://limelight-fastfood.herokuapp.com/api/v1/auth/login';

const adminUser = (event) => {
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
        localStorage.setItem('admin', data.token);
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'green';
        loginLoader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        window.location.href = '../admin/adminDashboard.html';
      } else {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loginLoader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        window.location.href = '../admin/adminLogin.html';
      }
    }).catch((error) => {
      throw error;
    });
};

adminBtn.addEventListener('click', adminUser);