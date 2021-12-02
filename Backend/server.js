const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const { setUpRoutes } = require("./routes");

//middleware
app.use(express.json());

//gestion des cors
app.use(cors());

//Routes
setUpRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
