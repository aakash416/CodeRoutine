import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const pages = [
  { name: "Explore", path: "/explore", role: "user", login: false },
  { name: "Jobs", path: "/jobs", role: "user", login: false },
  { name: "Courses", path: "/courses", role: "user", login: false },
  { name: "Problems", path: "/problems", role: "user", login: false },
  { name: "Contest", path: "/contest", role: "user", login: false },
  { name: "Discuss", path: "/discuss", role: "user", login: true },
  { name: "Interview", path: "/interview", role: "user", login: false },
  { name: "Store", path: "/store", role: "user", login: true },
];
export const storeSubmenuItems = [
  { name: "Redeem", path: "/store/redeem" },
  { name: "Premium", path: "/store/premium" },
];

export const interviewSubmenuItems = [
  { name: "Online Interview", path: "/interview/onlineinterview" },
  { name: "Assessment", path: "/interview/assessment" },
];

export const settings = [
  { name: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
  { name: "Dashboard", path: "/admin-dashboard", icon: <DashboardIcon /> },
  { name: "Orders", path: "/settings/orders", icon: <ListAltIcon /> },
  {
    name: "My Playgrounds",
    path: "/settings/playgrounds",
    icon: <ImportantDevicesIcon />,
  },
  {
    name: "Settings",
    path: "/settings/playgrounds",
    icon: <SettingsIcon />,
  },
  { name: "Sign Out", icon: <LogoutIcon /> },
];
