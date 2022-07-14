import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./Containers/Home";
import ManageCampaign from "./Containers/ManageCampaign";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/managecampaign" element={<ManageCampaign />} />
      <Route path="/managecampaign/:id" element={<ManageCampaign />} />
      <Route path="/createcampaign" element={<ManageCampaign isNew />} />
    </Routes>
  );
};

export default App;
