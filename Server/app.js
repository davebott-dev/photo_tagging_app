require('dotenv').config();
const express = require('express');
const app = express();
const apiRoute = require('./routes/api');


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',apiRoute);

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`the server is running on port ${port}`));