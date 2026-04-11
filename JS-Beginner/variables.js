// Variable = A container that stores a value.
//            Behaves as if it were the value that it contains.

// 1. declaration  let x;
// 2. assignment    x = 100;

let x = 123;

console.log(x);

// let age = 25;
// let price = 10.99;
// let gpa = 3.9;

// console.log(age);
// console.log(price);
// console.log(gpa);

// console.log(`You are ${age} years old`);
// console.log(`The price is $${price}`);
// console.log(`Your gpa is ${gpa}`);

console.log(typeof gpa)

let firstName = "Trjistan";
let favoriteFood = "Burger";
let email = "example@gmail.com"

console.log(typeof firstName);
console.log(`Your name is ${firstName}`);
console.log(`You like ${favoriteFood}`);
console.log(`Your email is${email}`);

// Booleans

// let online = true;
// let forSale = true;
// let isStudent = true;

// console.log(typeof online);
// console.log(`Bro is online: ${online}`);
// console.log(`Is this car for sale: ${forSale}`);
// console.log(`Enrolled: ${isStudent}`);

let fullName = "Trjistan Rieniel Bendoy";
let age = 20;
let isStudent = true;

document.getElementById("p-1").textContent = `Your name is ${fullName}`;
document.getElementById("p-2").textContent = `You are ${age}`;
document.getElementById("p-3").textContent = `Enrolled: ${isStudent}`;