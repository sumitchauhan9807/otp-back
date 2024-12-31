const express = require('express');
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

var cors = require('cors')
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); 
  } else {
    bodyParser.json()(req, res, next);
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/assets', express.static('assets'));
require('./models')
const routes = require('./router')



routes.initUserRoutes(app)
app.get('*', function (req, res) {
  res.send("otp")

});

app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    code: err.code || 500,
    status: err.status || 500,
    message: err.message || "Something went wrong.",
  });
});
app.listen('3030',()=>{
  console.log("Listening at 3030")
})

////http://localhost:3030/admin/did
//http://localhost:3030/api/searchdid/123
//https://services.global-world.us/admin/did