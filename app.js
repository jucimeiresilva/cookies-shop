require('dotenv').config();

const express = require('express');
const connect = require('./config/db.config');
const cors = require('cors');

connect();

const app = express();

app.use(express.json());

//app.use('/', require('./routes/user.routes'));

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`server running on PORT: ${process.env.PORT}`);
});
