const loader = document.querySelector('.loader');

const getMenuUrl = 'https://limelight-fastfood.herokuapp.com/api/v1/menu';

window.addEventListener('load', (event) => {
  event.preventDefault();
  const menuContent = document.querySelector('.menu-content');
  loader.style.display = 'block';


  const menu = (items) => {
    items.forEach((item) => {
      const eachMenu = `<li class="product-details">
  <div class="product-section">
    <div class="item-left">
      <a href="" class="image-popup">
        <img src="${item.food_image}" alt="" class="product-image img-fluid">
      </a>
      <h3 class="product-title">
        <span>${item.food_name}</span>
      </h3>
      <div class="product-description">
        <p>${item.description}</p>
      </div>
    </div>
    <div class="product-price">
      <ul>
        <li>
          <span class="name">Price</span>
          <span class="price"><span>&#8358;</span>${item.price}</span>
        </li>
      </ul>
    </div>
    <div class="clear"></div>
    <span class="price-name"></span>
  </div>
</li>`;

      menuContent.innerHTML += eachMenu;
    });
  };

  fetch(getMenuUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then((data) => {
      const menuList = data.menu;
      loader.style.display = 'none';
      menu(menuList);
    }).catch((error) => {
      throw error;
    });
});