const menuForm = document.getElementById('menuForm');
const loader = document.querySelector('.loader');
const foodName = document.getElementById('food-name');
const foodImage = document.getElementById('food-image');
const price = document.getElementById('price');
const description = document.getElementById('description');


const postMenuUrl = 'https://limelight-fastfood.herokuapp.com/api/v1/menu';


let imageLink;

const postMenu = (e) => {
  e.preventDefault();
  const info = {
    foodName: foodName.value,
    foodImage: imageLink,
    description: description.value,
    price: price.value
  };
  const msgDiv = document.querySelector('.msg-div');
  loader.style.display = 'block';
  const adminToken = localStorage.getItem('admin');
  fetch(postMenuUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': adminToken
      },
      mode: 'cors',
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'Error') {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.message;
      } else {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'green';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        modal.style.display = 'none';
      }
    }).catch((error) => {
      throw error;
    });
};

const upload = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'limelight');
  axios({
    url: 'https://api.cloudinary.com/v1_1/djdsxql5q/image/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then((response) => {
    imageLink = response.data.secure_url;
    document.getElementById('image').src = imageLink;
  });
};

document.getElementById('createMenuBtn').addEventListener('click', postMenu);
menuForm.reset();
foodImage.addEventListener('change', upload, false);