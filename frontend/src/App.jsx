import React, { useEffect, useState } from "react";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// import Home from "./Containers/Home";
import ManageCampaign from "./Containers/ManageCampaign";
import Templates from "./Containers/Templates";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/index";
import Dashboard from "./Containers/Dashboard";
import ManageTags from "./Components/PopUps/ManageTags";
import LandingPage from "./Containers/LandingPage";
import { LOGO_ICON } from "./Utils/staticData";
import Settings from "./Containers/Settings";
import "./App.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Campaign from "./Containers/Campaign";
import Directory from "./Containers/Directory";
import ManageTemplate from "./Containers/ManageTemplate/index";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import notify from "./Utils/helper/notifyToast";
import { UPDATE_POPUP_STATE, UPDATE_USER_DATA } from "./Redux/ActionTypes";
import { getUserData } from "./Services/user.service";
import PopUp from "./Components/General/PopUp";
import { getAllTags } from "./Services/tags.service";
import { getAllCustomFields } from "./Services/customField.service";

const App = () => {
  const userData = useSelector((state) => state.user?.userData);
  const popupStates = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["token"]);

  const [initialized, setInitialized] = useState(false);

  useEffect(async () => {
    fetchUserData();
  }, [cookie]);

  useEffect(() => {
    console.log("userData", userData);
    if (userData) {
      setInitialized(true);
    }
  }, [userData]);

  const fetchUserData = async () => {
    if (cookie.token) {
      try {
        const [localeUserData, userTags, userContactFields] = await Promise.all(
          [
            getUserData(cookie.token),
            getAllTags(cookie.token),
            getAllCustomFields(cookie.token),
          ]
        );

        dispatch({
          type: UPDATE_USER_DATA,
          data: {
            ...localeUserData.data,
            accessToken: cookie.token,
            tags: userTags.data.tags,
            customFields: userContactFields.data.contactFields,
          },
        });
      } catch (err) {
        notify("Internal Server Error", "error");
        dispatch({
          type: UPDATE_USER_DATA,
          data: null,
        });
        setInitialized(true);
      }
    } else {
      dispatch({
        type: UPDATE_USER_DATA,
        data: null,
      });
      setInitialized(true);
    }
  };

  const closeBookingPopup = () => {
    dispatch({
      type: UPDATE_POPUP_STATE,
      payload: {
        open: false,
      },
    });
  };

  return (
    <>
      <ToastContainer bodyClassName={"ToastBody"} />
      {initialized && (
        <Routes>
          {/* If not logged in */}
          {!userData ? (
            <>
              {["/signin", "/signup", "/"].map((path) => (
                <Route key={path} path={path} element={<LandingPage />} />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
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
              <Route path="/directory" element={<Directory />} />
              <Route path="/managecampaign/:id" element={<ManageCampaign />} />
              <Route path="/campaign" element={<Campaign />} />
              <Route
                path="/createcampaign"
                element={<ManageCampaign isNew />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              <Route
                path="/managetemplate/:templateId"
                element={<ManageTemplate />}
              />
              <Route
                path="/createtemplate"
                element={<ManageTemplate isNew />}
              />
              <Route
                path="/createsmstemplate"
                element={<ManageTemplate isNew isSMS />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          )}
        </Routes>
      )}
      {userData && (
        <>
          <PopUp
            isOpen={popupStates.open}
            ContentComp={popupStates.component}
            closeFun={closeBookingPopup}
            withBorder={false}
          />
        </>
      )}
    </>
  );
};

export default App;
