import React from "react";

import { Route, Routes } from "react-router-dom";
import navRouter from "router/navRouter";

import * as Layout from "layouts";

function App() {
  console.log(navRouter.getRouters());
  return (
    <Routes>
      {/* public routes */}
      <Route element={<Layout.LayoutHome />}>
        <Route path="login" element={<div>sda</div>} />
        <Route path="register" element={<div>sda</div>} />
        <Route path="unauthorized" element={<div>sda</div>} />
      </Route>
      {/* protect routes */}

      <Route path="/" element={<Layout.LayoutHome />}>
        <Route index element={<div>home</div>} />
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
