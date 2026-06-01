const sequelize = require('../config/db.config');
const Product = require('./product.model');

const db = {
  sequelize,
  Product
};

module.exports = db;