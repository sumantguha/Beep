const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const Data = require("./data").Data;
const MongoClient = require('mongodb').MongoClient;

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// get driver connection
const dbUri = 'mongodb+srv://capstone:capstone@capstone.ssxsr.mongodb.net/Beep?retryWrites=true&w=majority'
 
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology:true })
    .then((result) => {
        console.log('Connected to DB')
    }).catch((error) => {
        console.log('Error: ' + error)
    })

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});

app.get('/app', async (req, res) => {
    const data_obj = await Data.find({})
    await Data.deleteMany({'type': 'Alarm'})
    await Data.deleteMany({'type': 'Breathing'})
    await Data.deleteMany({'type': 'Temperature'})
    res.json(data_obj)
});