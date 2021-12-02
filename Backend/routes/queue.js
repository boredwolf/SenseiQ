const router = require('express').Router()
const queueModel = require('../models/queueModels') 


// Retourne la file d'attente triée par date asc
router.get("", async (req, res) => {
    try {
      res.send(await queueModel.findMany());
    } catch (e) {
      console.log(e);
      res.status(500).send("Unexpected error");
    }
  });
  // Insére une nouvelle ligne dans la queue
  router.post("", async (req, res) => {
    const { nom } = req.body;
    try {
      res.status(201).send( await queueModel.create(nom))
    } catch (e) {
      console.log(e);
      res.status(500).send("Unexpected error");
    }
  });
  // Surppime une ligne de la queue
  
  router.delete("/:id", async (req,res) => {
  const id = req.params.id
  try {
  res.status(204).send(queueModel.remove(id))
  } catch(e){
      console.log(e);
      res.status(500).send("Unexpected error");
  }
  })

  module.exports = router;