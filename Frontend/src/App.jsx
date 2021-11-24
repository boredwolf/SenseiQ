import { useEffect, useState } from "react";
import "./App.css";
import QueueForm from "./QueueForm";

function App() {
  const [queue, setQueue] = useState([]);
  const [count, setCount] = useState(0);

  async function fetchQueue() {
    const res = await fetch("http://localhost:3001/queue");
    setQueue(await res.json());
  }

  async function addToQueue(name) {
    try {
      await fetch("http://localhost:3001/queue", {
        method: "post",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({ nom: name }),
      });
      fetchQueue();
    } catch (e) {
      console.log(e);
      alert("aléd");
    }
  }

  async function deleteFromQueue(id) {
    try {
    await fetch(`http://localhost:3001/queue/${id}` , {
      method: "delete"
    })
    fetchQueue()
    } catch (e) {
console.log(e)
    }
  }

  useEffect(() => {
    fetchQueue();
  
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchQueue, 5000)
    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <div>
      <h1>Sensei Q</h1>

      <QueueForm onSubmit={addToQueue}  />

      {queue.map((q) => (
        <p key={q.id}>
          {q.id} : {q.nom} <button onClick={() => deleteFromQueue(q.id)}>delete</button>
        </p>
      ))}
    </div>
  );
}

export default App;
