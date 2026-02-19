
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { usePuterStore } from '../lib/puter'
import { useEffect } from 'react'
function App() {
  const {init} = usePuterStore();
  useEffect(() => {
    init();
  }, [init]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
