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
        headers: { "Content-type": "application/json" },
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
      await fetch(`http://localhost:3001/queue/${id}`, {
        method: "delete",
      });
      fetchQueue();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchQueue();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchQueue, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-red-400 via-yellow-400 to-pink-400 text-white min-h-screen text-center">
    <div className="container mx-auto p-4 max-w-2xl ">
      <h1 className="text-6xl sm:text-8xl">Sensei Q</h1>

      <QueueForm className="my-12" onSubmit={addToQueue} />

      {queue.map((q) => (
        <p  className=" my-4 bg-white bg-opacity-30 rounded-full flex  items-center" key={q.id}>
          <span className="flex-grow uppercase font-bold text-2xl sm:text-3 py-4">
          {q.nom}{" "}
          </span>
          <button className="h-20 w-20 bg-white text-red-400 rounded-full p-4 ml-4 hover:text-red-800 transition duration-500 ease-out transform hover:scale-110" onClick={() => deleteFromQueue(q.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
    </div>
  );
}

export default App;
