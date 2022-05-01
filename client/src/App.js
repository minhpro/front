import React from "react";
import * as Auth from "auth";
import * as Contants from "assets/contants";
import { Route, Routes, Navigate } from "react-router-dom";
import navRouter from "router/navRouter";

import * as Layout from "layouts";
import * as Pages from "pages";
import AddSchool from "pages/schoolManagement/AddSchool";
import EditSchool from "pages/schoolManagement/EditSchool";
import SchoolUserList from "pages/schoolUserManagement/SchoolUserList";
import AddSchoolUser from "pages/schoolUserManagement/AddSchoolUser";

const ROLES = {
  User: "USER",
  Admin: "ADMIN",
  teacher: "TEACHER",
};

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<Layout.LayoutAuth />}>
        <Route path="login" element={<Pages.AuthPage.LoginPage />} />
        <Route path="register" element={<Pages.AuthPage.LoginPage />} />
        <Route path="unauthorized" element={<Auth.Unauthorized />} />
      </Route>

      <Route element={<Layout.LayoutHome />}>
        {Contants.navData.header.map((router, i) => {
          return <Route key={i} path={router.link} element={router.element} />;
        })}
      </Route>
      {/* protect routes */}

      {/* admin */}

      <Route
        element={
          <Auth.RequireAuth
            allowedRoles={[
              Contants.authContants.ROLES.SystemAdmin,
              Contants.authContants.ROLES.Admin,
              Contants.authContants.ROLES.teacher,
              Contants.authContants.ROLES.Student,
              Contants.authContants.ROLES.other
            ]}
          />
        }
      >
        <Route path="/khao-thi" element={<Layout.LayoutExam />}>
          <Route
            path="danh-sach-bai-thi/:id"
            element={<Pages.DoTest.DoTest />}
          />
        </Route>

        <Route path="/khao-thi" element={<Layout.LayoutTest />}>
          <Route
            index
            element={<Navigate to="/khao-thi/cau-hinh-chung" replace />}
          />
          {navRouter.getRouters().map((router, index) => {
            return (
              <Route key={index} path={router.path} element={router.element} />
            );
          })}
          <Route
            path="quan-ly-de-thi/:id"
            element={<Pages.CreateExam.ViewExam />}
          />

          <Route
            path="danh-sach-cau-hoi-EBD/chinh-sua/:id"
            element={<Pages.BankQuestion.EditQuestion />}
          />
          <Route
            path="danh-sach-cau-hoi-rieng/chinh-sua/:id"
            element={<Pages.BankPrivateQuestion.EditQuestion />}
          />
          {/* <Route
            path="danh-sach-bai-thi/:id"
            element={<Pages.DoTest.DoTest />}
          /> */}
          <Route
            path="danh-sach-bai-thi/ket-qua/:id"
            element={<Pages.DoTest.ViewResult />}
          />

          <Route path="khao-thi/:id" element={<Pages.OrganTest.ViewTest />} />
        </Route>
        <Route path="schools/add-school" element={<AddSchool />} />
        <Route path="schools/edit-school/:id" element={<EditSchool />} />
        <Route path="schools/:schoolId/users" element={<SchoolUserList />} />
        <Route path="schools/:schoolId/users/add-user" element={<AddSchoolUser />} />
        <Route path="schools/:schoolId/users/edit-user/:id" element={<EditSchool />} />
      </Route>
    </Routes>
  );
}

export default App;
