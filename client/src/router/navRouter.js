import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ArticleIcon from "@mui/icons-material/Article";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
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
            element: <Pages.BankQuestion.ListQuestion />,
          },
          {
            name: "Ngân hàng câu hỏi",
            link: "ngan-hang-cau-hoi",
            element: <Pages.BankQuestion.ListQuestion />,
          },
          {
            name: "Thêm câu hỏi trắc nghiệm",
            link: "them-cau-trac-nghiem",
            element: <Pages.BankQuestion.ListQuestion />,
          },
          {
            name: "Thêm câu hỏi tự luận",
            link: "them-cau-tu-luan",
            element: <Pages.BankQuestion.ListQuestion />,
          },
        ],
      },
      {
        name: "Khởi tạo đề thi",
        icon: <ArticleIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quản lý ma trận đề",
            link: "quan-ly-ma-tran-de",
            element: <Pages.CreateExam.OrganMatrix />,
          },
          {
            name: "Quản lý đề thi",
            link: "quan-ly-de-thi",
            element: <Pages.CreateExam.OrganExam />,
          },
          {
            name: "Tạo đề ma trận mới",
            link: "tao-ma-tran-moi",
            element: <Pages.CreateExam.CreateMatrix />,
          },
          // {
          //   name: "Tạo đề thi mới",
          //   link: "tao-de-thi-moi",
          //   element: <Pages.CreateExam.CreateExams />,
          // },
        ],
      },
      {
        name: "Tổ chức khảo thí",
        icon: <BorderAllIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Khảo thí",
            link: "khao-thi",
            element: <Pages.OrganTest.OrganTest />,
          },
        ],
      },
      {
        name: "Làm bài thi / Kiểm tra",
        icon: <WorkOutlineIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "làm bài",
            link: "lam-bai",
            element: <Pages.DoTest.DoTest />,
          },
        ],
      },
      {
        name: "Xem đáp án",
        icon: <RemoveRedEyeIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Đáp án",
            link: "dap-an",
            element: <Pages.AnswerCheck.AnswerCheck />,
          },
        ],
      },
      {
        name: "Quản lý user",
        icon: <PersonIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Hồ sơ người dùng ",
            link: "ho-so-nguoi-dung",
            element: <Pages.UserManage.UserProfile />,
          },
          {
            name: "Danh sách User",
            link: "danh-sach-user",
            element: <Pages.UserManage.ListUser />,
          },
          {
            name: "Danh sách nhóm",
            link: "danh-sach-nhom",
            element: <Pages.UserManage.ListUserGroup />,
          },
        ],
      },
      {
        name: "Quản lý member",
        icon: <GroupIcon sx={{ fontSize: 30 }} />,
        nav: [
          {
            name: "Quản lý loại thành viên",
            link: "quan-ly-member",
            element: <Pages.MemberManage.MemberType />,
          },
          {
            name: "Quản lý nhóm thành viên",
            link: "quan-ly-nhom-member",
            element: <Pages.MemberManage.MemberGroup />,
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
