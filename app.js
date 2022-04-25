require('dotenv').config();

const express = require('express');
const connect = require('./config/db.config');
const cors = require('cors');

connect();

const app = express();

// middlewares gerais
app.use(express.json());
app.use(cors());

//rotas públicas
 app.use('/auth', require('./routes/auth.routes')); 

 //middlewares de rotas
 app.use(require('./middlewares/auth.middleware'));

 app.use('/products', require('./routes/products.routes'));

 app.use('/historic', require('./routes/historic.routes'));

 app.listen(process.env.PORT, () => {
    console.log(`server running on PORT: ${process.env.PORT}`);
});
