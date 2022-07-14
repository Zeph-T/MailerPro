import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Containers/Home";
import ManageCampaign from "./Containers/ManageCampaign";

import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        {/* If not logged in */}
        <Route exact path="/" element={<Home />} />
        {/* If logged in */}
        <Route
          element={
            <div className="container">
              <Outlet />
            </div>
          }
        >
          <Route path="/managecampaign" element={<ManageCampaign />} />
          <Route path="/managecampaign/:id" element={<ManageCampaign />} />
          <Route path="/createcampaign" element={<ManageCampaign isNew />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
