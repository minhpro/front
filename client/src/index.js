import React from "react";
import ReactDOM from "react-dom";
import * as Theme from "assets/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "redux/store/StoreProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Theme.StyledTheme>
          <Theme.MUItheme>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Theme.MUItheme>
        </Theme.StyledTheme>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
