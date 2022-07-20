const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { statusTypes } = require('../config/statuses');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: Number,
            default: statusTypes.on,
            enum: Object.values(statusTypes),
            required: true,
            validate(value) {
                if (Object.values(statusTypes).includes(value) === false) {
                    throw new Error('Invalid status');
                }
            },
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
