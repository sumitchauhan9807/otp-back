const express = require('express');
const app = express();

var cors = require('cors')

app.use(cors())
app.use('/assets', express.static('assets'));





app.get('*', function (req, res) {
  res.send("otp")

});

app.listen('3030',()=>{
  console.log("Listening at 3030")
})