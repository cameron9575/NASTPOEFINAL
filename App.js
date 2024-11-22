

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import ManageMenu from "../src/pages/ManageMenu";
import Navbar from "../src/components/navbar";
import items from "./styles/data";

const App = () => {
  const [menuItems, setMenuItems] = useState(items);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home updateMenu={setMenuItems} menuItems={menuItems} />} />
        <Route path="/manage-menu" element={<ManageMenu updateMenu={setMenuItems} menuItems={menuItems} />} />
      </Routes>
    </Router>
  );
};

export default App;
