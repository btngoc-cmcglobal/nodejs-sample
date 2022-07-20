const Joi = require('joi');
const { statusTypes } = require('../config/statuses');
const { objectId } = require('./custom.validation');

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        status: Joi.number().valid(...Object.values(statusTypes)).default(statusTypes.on)
    }),
};

const getCategories = {
    query: Joi.object().keys({
        name: Joi.string(),
        status: Joi.number().valid(...Object.values(statusTypes))
    }),
};

const getCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(objectId),
    }),
};

const updateCategory = {
    params: Joi.object().keys({
        categoryId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            status: Joi.number().valid(...Object.values(statusTypes))
        })
        .min(1),
};

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
