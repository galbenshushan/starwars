import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import Loader from "./components/Loader";
import { appStore } from "./stores/AppStore";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { createStar } from "./utils/UI";
import Home from "./pages/Home";

const App: React.FC = observer(() => {
  useEffect(() => {
    const starInterval = setInterval(createStar, 100);
    setTimeout(() => clearInterval(starInterval), 3000);
    return () => {
      clearInterval(starInterval);
    };
  }, []);

  return (
    <>
      <div className="stars-container" />
      <Router>
        {appStore.loading && <Loader />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </>
  );
});

export default App;
