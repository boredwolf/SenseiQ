const express = require("express");
const cors = require("cors")
const app = express();
const port = 3001;
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

//middleware
app.use(express.json());
app.use(cors());

// Charge les variables du fichier .env s'il existe
dotenv.config();

// Connexion à la DDB

const db = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Documentation ici");
});

// Retourne la file d'attente triée par date asc
app.get("/queue", async (req, res) => {
  try {
    const [queue] = await db.query("SELECT * FROM queue ORDER BY created ");
    res.send(queue);
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});
// Insére une nouvelle ligne dans la queue
app.post("/queue", async (req, res) => {
  const { nom } = req.body;
  try {
    await db.query("INSERT INTO queue (nom) VALUES (?)", [nom]);
    const [result]  = await db.query('SELECT * FROM queue WHERE nom = ?', [nom])
    res.status(201).send( result[0])
  } catch (e) {
    console.log(e);
    res.status(500).send("Unexpected error");
  }
});
// Surppime une ligne de la queue

app.delete("/queue/:id", async (req,res) => {
const id = req.params.id
try {
await db.query('DELETE FROM queue WHERE id = ?' , [id])
res.status(204).send()
} catch(e){
    console.log(e);
    res.status(500).send("Unexpected error");
}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
