const express = require('express');
const app = express();
const mongoDB = require("./db");
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!--------------------------------!!!!!!!!!!!!');
});

// CORS settings
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Use the router for the '/api' path
app.use('/api', require('./Routes/CreatUser'));

app.use('/api',require("./Routes/DisplayData"));

app.use('/api',require("./Routes/orderData"));

app.use('/api',require("./Routes/myOrderData"));


app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});



/*
const express = require('express')
const app = express()
const mongoDB = require("./db");
mongoDB()

app.get('/', (req, res) => {
  res.send('Hello World!--------------------------------!!!!!!!!!!!!');
});

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://localhost:3000/signup")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next()
})
app.use(express.json())
app.use('/api', require('./Routes/CreatUser'))

app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});
*/
