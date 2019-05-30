require("newrelic");

const express = require("express");
const bodyParser = require("body-parser");

require("./services/mongo");
require("./models/User");
require("./services/passport");
require("./models/Team");

const app = express();
app.use(bodyParser.json());

require("./routes/teamRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/imageRoutes")(app);
require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
