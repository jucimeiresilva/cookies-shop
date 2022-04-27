const { model, Schema } = require('mongoose');

const productsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: String
        },

        imageUrl: {
            type: String
        },
        reviews: [],
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    },
     {timestamps: true} 
);

module.exports = model('Products', productsSchema)