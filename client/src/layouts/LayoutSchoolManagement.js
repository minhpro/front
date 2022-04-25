import * as Ex from "Example";
import SchoolManagement from "pages/schoolManagement/SchoolManagement";
import React from "react";

export const LayoutSchoolManagement = () => {
  return (
    <>
      <Ex.Header.Nav />
      <SchoolManagement />
      <Ex.Footer />
    </>
  );
};

  