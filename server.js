const express = require("express");
const app = express();
const router = require("./routes/index");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./config/database");
require("./config/passport");
//Middleware
app.use(express.json());
app.use(cors());
app.use("/api", router); //ponete a escuchar cuando te entre cualquier pedido de cualquier metodo post o get
app.listen(4000, () => console.log("server in port :)"));
