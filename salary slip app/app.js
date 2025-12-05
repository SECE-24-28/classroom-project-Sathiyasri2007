// Import default exported object
import product from "./product.js";

// Object Destructuring
const { name, price, brand } = product;

// Display using Template Literals
document.getElementById("output").innerHTML = `
    <h2>Product Details</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Price:</b> ₹${price}</p>
    <p><b>Brand:</b> ${brand}</p>
`;
