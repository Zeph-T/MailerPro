import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ConfigureStore } from "./Redux/ConfigureStore";

const store = ConfigureStore();

const globalMUITheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: "#0079f1",
    },
    buttonGreen: {
      main: "#03a000",
    },
    buttonGrey: {
      main: "#8c8c8c",
    },
    buttonBlack: {
      main: "#001030",
    },
    buttonRed: {
      main: "#FF002E",
    },
    buttonBlue: {
      main: "#0468FF",
    },
    buttonOrange: {
      main: "#FF8A00",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={globalMUITheme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
