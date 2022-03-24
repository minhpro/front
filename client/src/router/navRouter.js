import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import * as Pages from "pages";
class NavRouter {
  constructor() {
    this.data = [
      {
        name: "He thong",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Cau hinh chung",
            link: "cau-hinh-chung",
            element: <Pages.System.PagesSystemComcom />,
          },
          {
            name: "Danh sach chuong",
            link: "danh-sach-chuong",
            element: <Pages.System.PageSystemListChapter />,
          },
          {
            name: "Danh sach bai",
            link: "danh-sach-bai",
            element: <Pages.System.PageSystemListUnit />,
          },
        ],
      },
      {
        name: "Ngan hang cau hoi EBD",
        icon: <AccountBalanceIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Danh sach cau hoi",
            link: "danh-sach-cau-hoi-EBD",
            element: <Pages.BankQuestion.ListQuestion />,
          },
          {
            name: "Them cau hoi trac nghiem",
            link: "them-cau-trac-nghiem-EDB",
            element: <Pages.BankQuestion.AddMultiQuestion />,
          },
          {
            name: "Them cau hoi tu luan",
            link: "them-cau-tu-luan-EBD",
            element: <Pages.BankQuestion.AddEssayQuestion />,
          },
        ],
      },
      {
        name: "Quan ly du lieu rieng",
        icon: <DataUsageIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Danh sach cau hoi",
            link: "danh-sach-cau-hoi",
            element: <div>saddas</div>,
          },
          {
            name: "Ngan hang cau hoi",
            link: "ngan-hang-cau-hoi",
            element: <div>saddas</div>,
          },
          {
            name: "Them cau hoi trac nghiem",
            link: "them-cau-trac-nghiem",
            element: <div>saddas</div>,
          },
          {
            name: "Them cau hoi tu luan",
            link: "them-cau-tu-luan",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Khoi tao de thi",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quan ly ma tran de",
            link: "quan-ly-ma-tran-de",
            element: <div>saddas</div>,
          },
          {
            name: "Quan ly de thi",
            link: "quan-ly-de-thi",
            element: <div>saddas</div>,
          },
          {
            name: "Chinh sua de thi",
            link: "chinh-sua-de-thi",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "To chuc khao thi",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Khao thi",
            link: "khao-thi",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Lam bai thi/ kiem tra",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "lam bai",
            link: "lam-bai",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Xem dap an",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Dap an",
            link: "dap-an",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Quan ly user",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "quan ly user",
            link: "quan-ly-user",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Quan ly member",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quan ly member",
            link: "quan-ly-member",
            element: <div>saddas</div>,
          },
        ],
      },
    ];
  }

  getRouters = () => {
    const routers = [];

    this.data.map((navRouter) =>
      navRouter.nav.forEach((router) => {
        let route = {
          path: router.link,
          element: router.element,
          breadcrumb: router.name,
        };
        routers.push(route);
      })
    );
    // getBreadcrumbs = () => {
    //   let data = this.getRouters();
    // };
    return routers;
  };
}

const navRouter = new NavRouter();

export default navRouter;
