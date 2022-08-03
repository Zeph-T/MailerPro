import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Containers/Home";
import ManageCampaign from "./Containers/ManageCampaign";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/index";

import "./App.css";
import "swiper/css";

import { LOGO_ICON } from "./Utils/staticData";

const App = () => {
  return (
    <>
      <Routes>
        {/* If not logged in */}
        <Route exact path="/" element={<Home />} />
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
        </Route>
      </Routes>
    </>
  );
};

export default App;
