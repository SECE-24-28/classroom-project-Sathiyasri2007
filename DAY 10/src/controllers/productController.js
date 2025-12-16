const { products } = require("../models/productModel");

// CREATE
exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// READ ALL
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// READ ONE
exports.getProductById = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

// UPDATE
exports.updateProduct = (req, res) => {
  const product = products.find((p) => p.id == req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name;
  product.price = req.body.price;

  res.json({ message: "Product updated", product });
};

// DELETE
exports.deleteProduct = (req, res) => {
  const index = products.findIndex((p) => p.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
};
