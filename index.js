const express = require('express')
const path = require('path')
const surveyRouter = require('./routes/survey');
const PORT = process.env.PORT || 5000

//express()
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var app = express();

app.use('/survey', surveyRouter,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://youthful-euclid-8ef091.netlify.app');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.listen(PORT, () => {
  console.log("Server running on port 5000");
 });

 module.exports = app;
