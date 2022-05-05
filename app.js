require('dotenv').config();

const express = require('express');
const connect = require('./config/db.config');
const cors = require('cors');

connect();

const app = express();

app.use(cors())

app.use(express.json());
app.use(cors());

 app.use('/auth', require('./routes/auth.routes')); 


 app.use(require('./middlewares/auth.middleware'));

 app.use('/products', require('./routes/products.routes'));

 app.use('/historic', require('./routes/historic.routes'));

 app.listen(process.env.PORT, () => {
    console.log(`server running on PORT: ${process.env.PORT}`);
});
