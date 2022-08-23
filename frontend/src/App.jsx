import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Containers/Home";
import ManageCampaign from "./Containers/ManageCampaign";
import Templates from "./Containers/Templates";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/index";
import Dashboard from "./Containers/Dashboard";
import ManageTags from "./Components/PopUps/ManageTags";
import { LOGO_ICON } from "./Utils/staticData";
import Settings from "./Containers/Settings";
import "./App.css";
import "swiper/css";

const App = () => {
  return (
    <>
      <Routes>
        {/* If not logged in */}
        <>
          {["/signin", "/signup", "/"].map((path) => (
            <Route key={path} path={path} element={<LandingPage />} />
          ))}
        </>

        {/* If logged in */}

        <Route
          element={
            <div className="Container">
              <Navbar />
              <div className="RightSection">
                <div className="PrimaryComponentWrapper">
                  <img src={LOGO_ICON} className="LogoIcon" alt="logo" />
                  <Outlet />
                </div>
                <Footer />
              </div>
            </div>
          }
        >
          {/* <Route path="*" element={<ManageCampaign />} /> */}
          <Route path="/managecampaign/:id" element={<ManageCampaign />} />
          <Route path="/createcampaign" element={<ManageCampaign isNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
