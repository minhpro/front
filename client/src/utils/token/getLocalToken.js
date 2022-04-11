export function getLocalToken() {
  const token = window.localStorage.getItem("token");
  // console.log("token >>>", token);
  return token;
}
