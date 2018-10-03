  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phoneNumber = document.getElementById('phoneNumber');
  const password = document.getElementById('password');
  const signUpBtn = document.querySelector('.signUp-btn');
  const signUpLoader = document.querySelector('.signUpLoader');
  const loginLoader = document.querySelector('.loginLoader');

  const validatePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };


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
    const confirmPassword = document.getElementById('confirmPassword').value;
    const result = validatePassword(info.password, confirmPassword);
    const msgDiv = document.querySelector('.msg-div');
    signUpLoader.style.display = 'block';
    if (result) {
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
            msgDiv.style.display = 'block';
            msgDiv.style.color = 'red';
            signUpLoader.style.display = 'none';
            msgDiv.innerHTML = data.message;
          } else if (data.status === 'Success') {
            localStorage.setItem('fastfoodfast', data.token);
            msgDiv.style.display = 'block';
            msgDiv.style.color = 'green';
            signUpLoader.style.display = 'none';
            msgDiv.innerHTML = data.message;
            window.location.href = './index.html';
          } else {
            msgDiv.style.display = 'block';
            msgDiv.style.color = 'red';
            signUpLoader.style.display = 'none';
            msgDiv.innerHTML = data.message;
            window.location.href = './signUp.html';
          }
        }).catch((error) => {
          throw error;
        });
    } else {
      msgDiv.textContent = 'Password does not match';
      msgDiv.style.color = 'red';
      signUpLoader.style.display = 'none';
    }
  };
  signUpBtn.addEventListener('click', newUser);

  const loginUser = (event) => {
    event.preventDefault();
    const info = {
      email: email.value,
      password: password.value
    };
    const msgDiv = document.querySelector('.msg-div');
    loginLoader.style.display = 'block';

  };