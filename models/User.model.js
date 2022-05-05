const { Schema, model } = require("mongoose");

const userSchema = new Schema (
    {
    name: {
        type: String,
        required: true,
    },

    birthDate: {
        type: String,
    },

    adress: {
        type: String
    },

    phone: {
        type: String
    },

    passwordHash: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    }

},
    {timestamps: true}
);



module.exports = model("User", userSchema);