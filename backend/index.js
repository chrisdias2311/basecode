const express = require('express');
const app = express();
const ConnectionDB = require("./database");
const cors = require('cors')

ConnectionDB();


app.use(express.json());
app.use(cors())



app.listen(5000,()=>{
    console.log(`server is running on port 5000`);
})