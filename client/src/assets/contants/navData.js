import * as Pages from "pages";
import { lmsHomeUrl } from "./apiContant";

export const header = [
  { id: 1, name: "Trang chủ", link: "/", element: <Pages.Home.Home /> },
  {
    id: 2,
    name: "Giới thiệu",
    link: "/gioi-thieu",
    element: <div>adsads</div>,
  },
  {
    id: 3,
    name: "Tin tức",
    link: "/tin-tuc",
    element: <div>adsads</div>,
  },
  {
    id: 4,
    name: "Liên hệ",
    link: "/lien-he",
    element: <div>adsads</div>,
  },
  {
    id: 4,
    name: "LMS",
    link: lmsHomeUrl,
    element: <Pages.LMSSelect />,
  },
  {
    id: 5,
    name: "Schools",
    link: "/schools",
    element: <Pages.SchoolManagement />,
  }
];
