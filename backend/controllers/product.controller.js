const { Product } = require('../models');
const axios = require('axios');

// GET /api/products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Libro no encontrado' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    let imageUrl = '';
    try {
      const randomImageId = Math.floor(Math.random() * 1000);
      const apiResponse = await axios.get(`https://picsum.photos/id/${randomImageId}/info`);
      imageUrl = apiResponse.data.download_url;
    } catch (apiError) {
      console.error('Error al consumir la API externa:', apiError.message);
      imageUrl = 'https://via.placeholder.com/400x600?text=Sin+Portada';
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      image_url: imageUrl
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Libro no encontrado' });
    }

    await product.update({ name, description, price, stock });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Libro no encontrado' });
    }

    await product.destroy();
    res.status(200).json({ success: true, message: 'Libro eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};