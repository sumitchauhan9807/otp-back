const express = require('express');
const app = express();




app.use('/assets', express.static('assets'));





app.get('*', function (req, res) {
  res.send("otp")

});

app.listen('3030',()=>{
  console.log("Listening at 3030")
})