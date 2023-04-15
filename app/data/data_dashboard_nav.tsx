import Customer_Icon from "@/svgIcon/Customer_Icon";
import Dashborad_Icon from "@/svgIcon/Dashborad_Icon";
import Money_Icon from "@/svgIcon/Money_Icon";
import User_Search_Icon from "@/svgIcon/User_Search_Icon";
import Wallet_Icon from "@/svgIcon/Wallet_Icon";

const data_dashboard_nav = [
  {
    name: "Dashboard",
    icon: <Dashborad_Icon />,
    path: "/dashboard",
  },
  {
    name: "Leads",
    icon: <User_Search_Icon />,
    path: "/",
  },
  {
    name: "Customer",
    icon: <Customer_Icon />,
    path: "/customer",
  },
  {
    name: "Sales",
    icon: <Money_Icon />,
    path: "/sales",
  },
  {
    name: "Expense",
    icon: <Wallet_Icon />,
    path: "/expense",
  },
];

export default data_dashboard_nav;
