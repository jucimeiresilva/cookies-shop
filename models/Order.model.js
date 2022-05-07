const { Schema, model } = require("mongoose");

const orderSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        product:
            {
                type: Schema.Types.ObjectId,
                ref: "Products"
            },
},
    {timestamps: true}
);



module.exports = model("Order", orderSchema);