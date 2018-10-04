const hideBtn = document.getElementsByClassName('hide-btn');
const showBtn = document.querySelector('.showBtn');

const hideLoginSignUp = () => {
  if (localStorage.getItem('fastfoodfast') !== null) {
    for (let i = 0; i < hideBtn.length; i++) {
      hideBtn[i].style.display = 'none';
    }
  } else {
    showBtn.style.display = 'none';
  }
};

hideLoginSignUp();