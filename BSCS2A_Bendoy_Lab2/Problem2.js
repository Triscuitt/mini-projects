let inputAge = "18";
let exactMatch = false;
let age = Number(inputAge); // Added this so it would convert string to number

if (age === 18) { 
    exactMatch = true;
}
let nextYearAge = age + 1; // Changed variables to age so it would add 1 to the previous variable
console.log("Is exactly 18? " + exactMatch + " | Age next year: " + nextYearAge);