const express = require('express')
const path = require('path')
const surveyRouter = require('./routes/survey');
const PORT = process.env.PORT || 5000

//express()
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var app = express();

app.use('/survey', surveyRouter);
app.listen(PORT, () => {
  console.log("Server running on port 5000");
 });

 module.exports = app;
