const modal = document.getElementById('modalPage');
const closeBtn = document.querySelector('.close-btn');
const modalBtn = document.querySelectorAll('.modalBtn');
 for (let i = 0; i < modalBtn.length; i++ ) {
  modalBtn[i].addEventListener('click', function() {
     modal.style.display = 'block';
   })
 }

// modalBtn.addEventListener('click', function() {
// modal.style.display = 'block';
// });
 
closeBtn.onclick = () => {
  modal.style.display = 'none';
}

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}