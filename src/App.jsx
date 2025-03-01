import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";  
import Login from "./pages/Auth/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LabourDashboard from "./pages/Labour/Dashboard";
import LandownerDashboard from "./pages/Landowner/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/labour/dashboard" element={<LabourDashboard />} />
            <Route path="/landowner/dashboard" element={<LandownerDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
