import * as Mui from "@mui/material";
import * as Co from "components";
import React from "react";
import * as Api from "api";
export const UserInfor = ({ id }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    Api.memberApi
      .detail(id)
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Mui.Stack direction={"column"}>
      {user ? (
        <>
          {" "}
          <Co.InputWrapper.UserInfor name={"ID nguoi dung"} value={user.code} />
          <Co.InputWrapper.UserInfor
            name={"Ten nguoi dung"}
            value={user.fullName}
          />
          <Co.InputWrapper.UserInfor
            name={"Ngay sinh"}
            value={user.birthDate}
          />
          <Co.InputWrapper.UserInfor
            name={"So dien thoai"}
            value={user.phone}
          />
          <Co.InputWrapper.UserInfor name={"Email"} value={user.email} />
          <Co.InputWrapper.UserInfor name={"Vai tro"} value={user.role} />
          <Co.InputWrapper.UserInfor
            name={"Nhom"}
            value={user.groupData.name}
          />
          <Co.InputWrapper.UserInfor name={"Trang thai"} />{" "}
        </>
      ) : null}
    </Mui.Stack>
  );
};
