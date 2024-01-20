const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connect=require("./db/connection")
require("dotenv").config();

const app = express();
app.use(cors());

const port = process.env.DB_API_URL;

const loginRouter=require("./routes/loginRouter");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(upload.array()); 
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/login',  loginRouter);
connect()
app.listen(port, () => console.log("listening on port", port));