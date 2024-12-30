import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Index";
import Sketch from "./pages/Sketch/Index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/sketch" element={<Sketch/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
