import { Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Login from "./components/login-form";
import Signup from "./components/signup-form";
import Menu from "./components/Menu";         
import Summarizer from "./pages/Summarizer"; 

import "./App.css";

const Home = () => (
  <>
    <Hero />
    <Demo />
  </>
);

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="app">
        <Routes>
          
          <Route path="/" element={<Navigate to="/login" replace />} />

         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          
          <Route path="/menu" element={<Menu />} />

          
          <Route path="/home" element={<Home />} />
          <Route path="/summarizer" element={<Summarizer />} /> 
        </Routes>
      </div>
    </main>
  );
};

export default App;
