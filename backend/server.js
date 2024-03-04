const express = require("express");
const app = express();
const dotenv = require("dotenv").config;
const cors = require("cors");

const port = process.env.PORT ? process.env.PORT : 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/users"));

app.listen(port, console.log(`Server started, listening on port ${port}!`));
