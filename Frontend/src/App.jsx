import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [queue, setQueue] = useState([])
  const [count, setCount] = useState(0)

async function fetchQueue() {
const res = await fetch('https://localhost:3001/queue')
setQueue(await res.json())

}

  useEffect(() => {
    fetchQueue()
  }, [])

  return (
    <div >
      <h1>Sensei Q</h1>
       {queue.map(q => {
         <p key={q.id}>{q.id} : {q.name}</p>
       })}
    </div>
  )
}

export default App
