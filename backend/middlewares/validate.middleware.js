const Joi = require('joi');

const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required().messages({
      'string.empty': 'El nombre del libro no puede estar vacío',
      'any.required': 'El nombre del libro es obligatorio'
    }),
    description: Joi.string().allow('', null),
    price: Joi.number().positive().required().messages({
      'number.positive': 'El precio debe ser mayor a 0'
    }),
    stock: Joi.number().integer().min(0).required().messages({
      'number.min': 'El stock no puede ser negativo'
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }

  next();
};

module.exports = { validateProduct };