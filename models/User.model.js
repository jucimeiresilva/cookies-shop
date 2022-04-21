const { Schema, model } = require("mongose");

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    birthDate: {
        type: String,
    },

    address: {
        type: String,
        required: true,
    },

},
    {timestamps: true}
);



module.exports = model("User", userSchema);