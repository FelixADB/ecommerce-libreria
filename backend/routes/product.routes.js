const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middlewares/validate.middleware');
const productController = require('../controllers/product.controller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateProduct, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;