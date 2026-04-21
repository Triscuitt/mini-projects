let currentStock = 0; // I have added 0 so it would initialized the variable
const newArrival = 50;
currentStock = currentStock + newArrival;
let bonusItem = 4; // I change const to Let, so the variables can be reassign
bonusItem++;
currentStock += bonusItem;
console.log("Current Stock: " + currentStock);