import React from "react";
import ReactDOM from "react-dom";
import * as Theme from "assets/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "redux/store/StoreProvider";
import App from "./App";
import * as Layout from "layouts";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Theme.StyledTheme>
          <Theme.MUItheme>
            <Layout.LayoutNavigationScroll>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </Layout.LayoutNavigationScroll>
          </Theme.MUItheme>
        </Theme.StyledTheme>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
