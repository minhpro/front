export function removeLocalToken() {
  const token = window.localStorage.removeItem("token");
  // console.log("token >>>", token);
  return token;
}
