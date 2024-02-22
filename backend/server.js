const express = require("express");
const app = express();
const dotenv = require("dotenv").config;

const port = process.env.PORT ? process.env.PORT : 4000;

app.listen(port, console.log(`Server started, listening on port ${port}!`));
