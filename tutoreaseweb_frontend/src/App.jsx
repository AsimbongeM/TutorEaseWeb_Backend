import { useState } from 'react'
import ClassSession from "./components/ClassSession.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <ClassSession/>
      </div>

    </>
  )
}

export default App
