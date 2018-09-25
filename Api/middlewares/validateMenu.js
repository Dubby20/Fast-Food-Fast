const foodNameRegex = /^[A-Za-z '.-]*$/;
const foodImageRegex = /^[A-Za-z]{1,35}.(jpg|jpeg|png)$/;
const descriptionRegex = /^[A-Za-z]{3,50}$/;

export class MenuValidator {
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  testFoodName(foodName) {
    if (!foodNameRegex.test(foodName)) {
      this.passing = false;
      this.errMessage = 'FoodName must contain between 3 and 20 characters only';
    }
  }

  testFoodImage(foodImage) {
    if (!foodImageRegex.test(foodImage)) {
      this.passing = false;
      this.errMessage = 'FoodImage url must be jpg, jpeg and png';
    }
  }

  testDescription(description) {
    if (!descriptionRegex.test(description)) {
      this.passing = false;
      this.errMessage = 'Description must contain between 3 and 50 characters only';
    }
  }

  testPrice(price) {
    if (typeof price !== 'number' && price < 500) {
      this.passing = false;
      this.errMessage = 'Price must be a number greater than 500';
    }
  }

  resetValid() {
    this.passing = true;
    this.errMessage = '';
  }

  testForEmptyStringInput(food_menu) {
    let check = Object.values(food_menu);
    check = check.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  testFoodMenu(food_menu) {
    this.resetValid();
    this.testFoodName(food_menu.foodName);
    this.testFoodImage(food_menu.foodImage);
    this.testDescription(food_menu.description);
    this.testPrice(food_menu.price);
    this.testForEmptyStringInput(food_menu);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default MenuValidator;