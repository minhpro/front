export function getLocalRefreshToken() {
  const token = window.localStorage.getItem("refreshToken");
  return token;
}
