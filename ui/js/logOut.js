const logOutBtn = document.querySelectorAll('.logOut');

for (let i = 0; i < logOutBtn.length; i++) {
  logOutBtn[i].addEventListener('click', () => {
    localStorage.removeItem('fastfoodfast');
    window.location.href = './index.html';
  });
}