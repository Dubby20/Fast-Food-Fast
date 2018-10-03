  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phoneNumber = document.getElementById('phoneNumber');
  const password = document.getElementById('password');
  const signUpBtn = document.querySelector('.signUp-btn');

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  const parseJSON = res => res.json();

  const signUpUrl = 'https://limelight-fastfood.herokuapp.com/api/v1/auth/signup';

  const newUser = (e) => {
    e.preventDefault();
    const info = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      password: password.value
    };
  const msgDiv = document.querySelector('.msg-div');
    fetch(signUpUrl, {
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
          msgDiv.innerHTML = data.message;
          msgDiv.style.display = 'block';
          msgDiv.style.color = 'red';
        }
        if (data.status === 'Success') {
          localStorage.setItem('fastfoodfast', data.token);
          msgDiv.style.display = 'block';
          msgDiv.style.color = 'green';
          msgDiv.innerHTML = data.message;
          window.location.href = './index.html';
        } else {
          msgDiv.style.display = 'block';
          msgDiv.style.color = 'red';
          msgDiv.innerHTML = data.message;
          window.location.href = './signUp.html';
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  signUpBtn.addEventListener('click', newUser);