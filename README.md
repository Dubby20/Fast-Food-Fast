[![Build Status](https://travis-ci.org/Dubby20/Fast-Food-Fast.svg?branch=develop-challenge-3)](https://travis-ci.org/Dubby20/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/Dubby20/Fast-Food-Fast/badge.svg?branch=develop-challenge-3)](https://coveralls.io/github/Dubby20/Fast-Food-Fast?branch=develop-challenge-3)
[![Maintainability](https://api.codeclimate.com/v1/badges/c5563c607a08e0628986/maintainability)](https://codeclimate.com/github/Dubby20/Fast-Food-Fast/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c5563c607a08e0628986/test_coverage)](https://codeclimate.com/github/Dubby20/Fast-Food-Fast/test_coverage)
# Fast-Food-Fast
Fast-Food-Fast is a food delivery service app for a restaurant

+ Hosted Github Page [Limelight](https://dubby20.github.io/Fast-Food-Fast/)

## Features
+ Users can create account.
+ Users can log in.
+ Users can order for food.
+ Users can see a history of ordered food.
+ Admin can add food items.
+ Admin can edit food items.
+ Admin can delete food items.
+ Admin can see a list of food items.
+ Admin can see a list of orders.
+ Admin can accept or decline orders.
+ Admin can mark orders as processing, cancelled or complete.

## Setup

Step by step instructions on how to get the code setup locally. This may include:
+ Open the terminal
+ cd into directory that you want the project to reside.
```
cd projects
```
+ clone the repository into that directory.
```
git clone https://github.com/Dubby20/Fast-Food-Fast.git
```

```
run npm install && npm run start
```

### Dependencies

List of libraries, tools, etc used for this project
* [Nodejs](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - A web framework for [Nodejs](https://nodejs.org/en/)
* [Babel](https://babeljs.io) - Javascript compiler.
* [Eslint](https://eslint.org/) - Javascript linter. [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript)
<!-- * [Postgresql](https://www.postgresql.org/) -->

### Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - A BDD / TDD Assertion library.
* [Istanbul](https://istanbul.js.org) - Javascript code coverage tool.
* [nyc](https://github.com/istanbuljs/nyc) - The Istanbul command line interface.

## :star: Documentation :star:
List of endpoints exposed by the service

## Endpoints
**Routes**

* POST `/api/v1/auth/signup` Use this route to create an account. The following fields are required:
  * `firstname` The user firstname
  * `lastname` The user lastname
  * `email` The user email address
  * `password` The user password at least 6 characters and at most 15 characters

* POST `/api/v1/auth/login` Use this route to login to the application. The folowing fields are required:
  * `email` The user registered email
  * `password` The user registered password

* POST `/api/v1/orders` Use this route to place a new order. The following fields are required:
  * `phoneNumber` The user phone number
  * `address` The user address
  * `foodItems` An array of objects containing `foodId` and `quantity`

* POST `/api/v1/menu` An authenticated Admin can use this route to add menu. The following field is required:
  * `foodName` The name of the food
  * `price` The price the food is sold for
  * `foodImage` The image of the food
  * `description`  The description of the food

* GET `api/v1/menu` Use this route to get all the available menu

* GET `api/v1/users/userId/orders` Use this route to get the order history of a particular user

* GET `/api/v1/orders` An authenticated Admin can use this route to retrieve all orders.

* GET `/api/v1/orders/orderId` An authenticated Admin can use this route to fetch a specific order.

* PUT `/api/v1/orders/orderId` An authenticated Admin can use this route to update the status of an order. The following field is required:
  * `status` The status of an order which can be `Processing`, `Cancelled`, or `Complete`

## Demo
A fully functional demo of this project hosted on Heroku is available at [Limelight](https://limelight-fastfood.herokuapp.com/)

### Testing the application
List of steps to run the service

[Postman](www.getpostman.com)

Running unit tests.
* In a terminal, `cd` to the cloned project file.
* Run `npm test`. This runs tests and displays coverage data generated by [Istanbul's](https://istanbul.js.org) nyc.

## Contributing

__:heart: contributions!__

I will __happily__ accept your pull request if it:
- __has tests__
- looks reasonable
- does not break backwards compatibility

## Author
Jacinta Nnadi
