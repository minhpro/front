import React from "react";
import { NavMenu } from "./NavMenu";
import { useSelector } from "react-redux";
import { ButtonLogin } from "./ButtonLogin";
import * as LocalStorage from "utils/token/LocalStorage";

export const AuthHeader = () => {
  const auth = useSelector((s) => s.reduxAuth);
  return (
    <>
      {LocalStorage.auth.getLocalToken() ? (
        <NavMenu name={auth?.auth?.username} />
      ) : (
        <ButtonLogin />
      )}
    </>
  );
};
