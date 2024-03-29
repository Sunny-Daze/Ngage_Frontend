import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaRegCompass } from "react-icons/fa";
import { MdOutlineAccountTree } from "react-icons/md";
import { BsLightningChargeFill, BsPlay } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Notification from "./NotificationPanel/Notification";
import { fetchData } from "../services/request";
import { domain, endPoints } from "../services/endPoints";

const routes = [
  {
    path: "/community",
    name: "Community",
    icon: <FaRegCompass />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <MdOutlineAccountTree />,
    subRoutes: [],
  },
  {
    path: "/training",
    name: "Training",
    icon: <BsLightningChargeFill />,
    subRoutes: [
      {
        path: "/training/learning-management",
        name: "Learning Management ",
        icon: <AiOutlineStar />,
      },
      {
        path: "/training/professional-growth",
        name: "Professional Growth",
        icon: <AiOutlineStar />,
      },
    ],
  },
  {
    path: "/recreation",
    name: "Recreation",
    icon: <BsPlay />,
  },
  {
    path: "/management",
    name: "Management",
    icon: <FiUsers />,
    subRoutes: [
      {
        path: "/management/user-control",
        name: "User ",
        icon: <AiOutlineStar />,
      },
      {
        path: "/management/admin-control",
        name: "Admin Control",
        icon: <AiOutlineStar />,
      },
    ],
  },
  {
    path: "/store",
    name: "Store",
    icon: <HiShoppingCart />,
  },
];

function getuserDetails(type) {
  let userDetails = JSON.parse(localStorage.getItem("user") ?? "");
  switch (type) {
    case "role":
      return userDetails.role;

    case "name":
      return userDetails.userName;

    case "avatar":
      return userDetails.userName[0].toUpperCase();

    default:
      break;
  }
}

function getUserRoutes() {
  let role = getuserDetails("role");

  if (role === "Employee") {
    return [routes[0], routes[1], routes[2], routes[3], routes[5]];
  }

  if (role === "Customer") {
    return [routes[0], routes[1]];
  }

  if (role === "Admin") {
    return routes;
  }

  if (role === "SuperAdmin") {
    return routes;
  }
}

const HomePage = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
    setShowProfileCard(!showProfileCard);
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const navigate = useNavigate();
  const [ToggleNotification, setToggleNotification] = useState(false);

  useEffect(() => {
    fetchData(domain + endPoints.fetchProjectNames, {}).then((e) => {
      if (e.data.success) {
        for (const route of getUserRoutes()) {
          console.log(route);
          if (route.name === "Projects") {
            let arr = [];
            e.data.result.forEach((e) => {
              let obj = {
                path: "/project/" + e._id,
                name: e.title,
                icon: <AiOutlineStar />,
              };
              arr.push(obj);
            });

            route.subRoutes = arr;
          }
        }
      }
    });
  }, []);

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  style={{ display: "flex" }}
                >
                  <AdbIcon
                    style={{ fontSize: "30px" }}
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="NavLink"
                    to="/community"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    NGAGE
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {getUserRoutes().map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold", color: "darkslategray" }}
                        >
                          {route.name}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>

          {showProfileCard && (
            <div className="profileCard">
              <div className="avatar">
                <Avatar style={{ width: "2.3rem", height: "2.3rem" }}>
                  {getuserDetails("avatar")}
                </Avatar>
              </div>
              <div className="info">
                <div className="logged-in-username">
                  <Typography
                    style={{
                      color: "white",
                      fontWeight: "540",
                      fontSize: "0.9rem",
                    }}
                    variant="body2"
                  >
                    {getuserDetails("name")}
                  </Typography>
                </div>
                <div className="roleParent">
                  <div className="role">
                    <Typography
                      style={{
                        color: "#001f54",
                        fontWeight: "700",
                        fontSize: "0.7rem",
                      }}
                      variant="body2"
                    >
                      {getuserDetails("role")}
                    </Typography>
                  </div>
                  {/* <Chip label="primary" color="primary" /> */}
                </div>
              </div>
              <div className="notification">
                <Badge
                  // style={{ color: "white", fontSize:'1px' }}
                  badgeContent={1}
                  // color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "red",
                      color: "white",
                      fontSize: 12,
                      height: 18,
                      minWidth: 10,
                    },
                  }}
                >
                  <MailIcon
                    onClick={() => setToggleNotification(true)}
                    style={{ fontSize: "1.4rem", color: "white" }}
                  />
                </Badge>
              </div>
              <div className="settings">
                <SettingsIcon
                  style={{ fontSize: "1.4rem" }}
                  id="basic-menu"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    style={{
                      fontSize: "0.95rem",
                      width: "8.5rem",
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      navigate("/user-profile");
                    }}
                  >
                    <Avatar
                      sx={{ width: 29, height: 29, marginRight: "0.5rem" }}
                    />
                    My Account
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    style={{
                      fontSize: "0.95rem",
                      width: "7.5rem",
                      paddingLEft: "0.5rem",
                      paddingRight: "0.5rem",
                    }}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    <Logout
                      fontSize="small"
                      style={{ marginRight: "0.5rem" }}
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </motion.div>
        <main>{children}</main>
      </div>
      <Notification
        ToggleNotification={ToggleNotification}
        setToggleNotification={setToggleNotification}
      />
    </>
  );
};

export default HomePage;
