import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import * as Pages from "pages";
class NavRouter {
  constructor() {
    this.data = [
      {
        name: "Hệ thống",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Cấu hình chung",
            link: "cau-hinh-chung",
            element: <Pages.System.PagesSystemComcom />,
          },
          {
            name: "Danh sách chủ đề",
            link: "danh-sach-chuong",
            element: <Pages.System.PageSystemListChapter />,
          },
          {
            name: "Danh sách đơn vị kiến thức",
            link: "danh-sach-bai",
            element: <Pages.System.PageSystemListUnit />,
          },
        ],
      },
      {
        name: "Ngân hàng câu hỏi EBD",
        icon: <AccountBalanceIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Danh sach câu hỏi",
            link: "danh-sach-cau-hoi-EBD",
            element: <Pages.BankQuestion.ListQuestion />,
          },
          {
            name: "Thêm câu hỏi trắc nghiệm",
            link: "them-cau-trac-nghiem-EDB",
            element: <Pages.BankQuestion.AddMultiQuestion />,
          },
          {
            name: "Thêm câu hỏi tự luận",
            link: "them-cau-tu-luan-EBD",
            element: <Pages.BankQuestion.AddEssayQuestion />,
          },
        ],
      },
      {
        name: "Quản lý dữ liệu riêng",
        icon: <DataUsageIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Danh sách câu hỏi",
            link: "danh-sach-cau-hoi",
            element: <div>saddas</div>,
          },
          {
            name: "Ngân hàng câu hỏi",
            link: "ngan-hang-cau-hoi",
            element: <div>saddas</div>,
          },
          {
            name: "Thêm câu hỏi trắc nghiệm",
            link: "them-cau-trac-nghiem",
            element: <div>saddas</div>,
          },
          {
            name: "Thêm câu hỏi tự luận",
            link: "them-cau-tu-luan",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Khởi tạo đề thi",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quản lý ma trận đề",
            link: "quan-ly-ma-tran-de",
            element: <div>saddas</div>,
          },
          {
            name: "Quản lý đề thi",
            link: "quan-ly-de-thi",
            element: <div>saddas</div>,
          },
          {
            name: "Chỉnh sửa đề thi",
            link: "chinh-sua-de-thi",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Tổ chức khảo thí",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Khảo thí",
            link: "khao-thi",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Làm bài thi / Kiểm tra",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "làm bài",
            link: "lam-bai",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Xem đáp án",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Đáp án",
            link: "dap-an",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Quản lý user",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quản lý user",
            link: "quan-ly-user",
            element: <div>saddas</div>,
          },
        ],
      },
      {
        name: "Quản lý member",
        icon: <WysiwygIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quản lý member",
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
