const db = require('../services/db')



//retourne toutes les entrées de la file d'attente
const findMany = async () => {
    const [queue] = await db.query("SELECT * FROM queue ORDER BY created ");
    return queue;
}
//créer une nouvelle entrée de la file d'attente
const create = async (name) => {
    await db.query("INSERT INTO queue (nom) VALUES (?)", [name]);
    const [result]  = await db.query('SELECT * FROM queue WHERE nom = ?', [name])
    return result;
}
//supprime une entrée
const remove = async (id) => {
  await db.query('DELETE FROM queue WHERE id = ?' , [id])
}

module.exports = {findMany, remove, create}