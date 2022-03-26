import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import navRouter from "router/navRouter";

import * as Layout from "layouts";
import * as Pages from "pages";

function App() {
  console.log(navRouter.getRouters());

  return (
    <Routes>
      {/* public routes */}
      <Route element={<Layout.LayoutAuth />}>
        <Route path="login" element={<Pages.AuthPage.LoginPage />} />
        <Route path="register" element={<Pages.AuthPage.LoginPage />} />
        <Route path="unauthorized" element={<div>sda</div>} />
      </Route>
      {/* protect routes */}
      <Route path="/" element={<Layout.LayoutHome />}>
        <Route index element={<Navigate to="/cau-hinh-chung" replace />} />
        {navRouter.getRouters().map((router, index) => {
          return (
            <Route key={index} path={router.path} element={router.element} />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
