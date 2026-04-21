const basePrice = 100;
let finalPrice = 0; 
let discount = 0; // I move the discount outside the block and set it to 0;
let isVip = true;
if (isVip) {
    discount = 20;
    finalPrice = basePrice - discount; // I remove declaration in variable since it's already declared outside this block
    //I removed the basePrice = 100; since its already declared outside this block
}
console.log("Base: " + basePrice + " | Discount: " + discount + " | Final Price: " + finalPrice);