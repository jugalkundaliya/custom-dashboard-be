const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
require("./server");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
