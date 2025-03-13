import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Index";
import Sketch from "./pages/Sketch/Index";
import TaskCompleted from "./pages/TaskCompleted/Index";
import SampleProject from "./pages/Samples/Index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/sketch" element={<Sketch/>} />
          <Route path="/task-completed" element={<TaskCompleted/>} />
          <Route path="/samples" element={<SampleProject/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
