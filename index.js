const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const userRoutes = require("./Routes/user");

//define port
const port = process.env.PORT || 4000;
//database
require("./connection/db");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger());

//user routes
app.use("/auth", userRoutes);

//create server
app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
