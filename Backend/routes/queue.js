const router = require('express').Router()
const db = require('../services/db')

// Retourne la file d'attente triée par date asc
router.get("/", async (req, res) => {
    try {
      const [queue] = await db.query("SELECT * FROM queue ORDER BY created ");
      res.send(queue);
    } catch (e) {
      console.log(e);
      res.status(500).send("Unexpected error");
    }
  });
  // Insére une nouvelle ligne dans la queue
  router.post("/", async (req, res) => {
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
  
  router.delete("/:id", async (req,res) => {
  const id = req.params.id
  try {
  await db.query('DELETE FROM queue WHERE id = ?' , [id])
  res.status(204).send()
  } catch(e){
      console.log(e);
      res.status(500).send("Unexpected error");
  }
  })

  module.export = router;