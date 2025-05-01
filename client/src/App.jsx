// import { useState } from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddNote from "./routes/Home/add-note";
import UpdateNote from "./routes/Home/update-note";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-note" element={<AddNote />}></Route>
          <Route path="/update-note/:id" element={<UpdateNote />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
