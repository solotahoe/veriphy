const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const UserRouter = require("./routes/routes");
//const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
import dotenv from "dotenv";

//HIDING VARIABLES AND SENSITIVE INFO IN A DOTENV FILE

const db_password = process.env.DB_PASSWORD;

//middlewares
app.use(bodyParser.json());
dotenv.config();
app.use(cors());
///routing
app.get("/", (req, res) => {
  res.send("we are on home");
});

/// a middleware that runs everytime the user hits the users route;
app.use("/users", UserRouter);

///code from attlas itself start
///code from attlas itself end

//connect to the database
mongoose.connect(
  `mongodb+srv://solo:solo0702591509@cluster0.k32dc.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to the db");
  }
);

// //confirming database connection
mongoose.connection.on("connected", () => {
  console.log("connection confirmed");
});

mongoose.connection
  .once("open", () => {
    console.log("Secondend confirmed connection");
  })
  .on("error", (error) => {
    console.log(`connection error: ${error}`);
  });
//custom heroku functions
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// removin the # in my react start
app.use(express.static(__dirname + "/client/public"));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});
// removin the # in my react end
//listening to the server
const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
  console.log("port connection succesfull");
});
