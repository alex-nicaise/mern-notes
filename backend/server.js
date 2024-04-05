const express = require("express");
const app = express();
const dotenv = require("dotenv").config;
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT ? process.env.PORT : 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, console.log(`Server started, listening on port ${port}!`));
