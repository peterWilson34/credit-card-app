const express = require('express');
const app = express();
const cardsRoutes = require('./routes/cards');
const bodyParser = require('body-parser');

app.use(function (req,res,next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  next();
})


app.use(bodyParser.json())

app.use(cardsRoutes);

app.listen(8000)
module.exports = app;