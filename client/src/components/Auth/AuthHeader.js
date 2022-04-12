import React from "react";
import { NavMenu } from "./NavMenu";
import { useSelector } from "react-redux";
import { ButtonLogin } from "./ButtonLogin";

export const AuthHeader = () => {
  const auth = useSelector((s) => s.reduxAuth);

  return (
    <>
      {auth?.auth?.loading ? (
        <ButtonLogin />
      ) : (
        <NavMenu name={auth?.auth?.username} />
      )}
    </>
  );
};
