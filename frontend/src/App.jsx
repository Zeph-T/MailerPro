import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./Containers/LandingPage";
import ManageCampaign from "./Containers/ManageCampaign";
import Templates from "./Containers/Templates";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/index";
import ManageTags from "./Components/PopUps/ManageTags";
import { LOGO_ICON } from "./Utils/staticData";
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
          path="/popup"
          element={
            <div
              style={{
                backgroundColor: "black",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ManageTags />
            </div>
          }
        />
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
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
