const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/Team");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();
app.use(bodyParser.json());

require("./routes/teamRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
