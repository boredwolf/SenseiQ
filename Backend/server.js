const express = require("express");
const cors = require("cors")
const app = express();
const port = 3001;
const dotenv = require("dotenv");
const { setUpRoutes } = require('./routes')

//middleware
app.use(express.json());

//gestion des cors
app.use(cors());

// Charge les variables du fichier .env s'il existe
dotenv.config();


//Routes
setUpRoutes(App)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
