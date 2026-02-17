
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'

function App() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<Analyzer />} />
      </Routes>
    </div>
  )
}

export default App
