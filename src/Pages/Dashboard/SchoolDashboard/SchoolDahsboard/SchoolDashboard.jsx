import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Drawer from "react-modern-drawer";
import React from "react";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import logo from "../../../../assets/login/logo.png"
import "./SchoolDashboard.css"
import { ImCross, ImHeadphones } from "react-icons/im";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsFillPeopleFill, BsHouseDoor } from "react-icons/bs";
import { SiReaddotcv } from "react-icons/si";

import { IoIosLogOut } from "react-icons/io";
import SchoolDashboardFooter from "../../../../Shared/SchoolDashboardFooter/SchoolDashboardFooter"
import { FcSpeaker } from "react-icons/fc";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useLogout } from "../../../../hooks/useLogout";
function SchoolDashboard() {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleDrawer = () => {
    // setIsOpen((prevState) => !prevState);
  };
  const { logout } = useLogout();
  const location = useLocation();
  const { user } = useAuthContext();
  console.log("🚀 ~ SchoolDashboard ~ user:", user)

  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <div className="flex ">
        <div className={`h-screen z-40   ${isOpen ? "w-96" : "w-0 "}`}>
          {/* icons */}
          <div className="mt-40 fixed bg-slate-200 pb-2 rounded mx-1">
            <button
              onClick={toggleDrawer}
              className={`px-4 pt-3 text-3xl animate__animated animate__slideInLeft ${
                isOpen ? "hidden" : ""
              } `}
            >
              <AiOutlineMenu />
            </button>
            <ul
              className={`space-y-4 mt-4 px-4 animate__animated animate__slideInLeft ${
                isOpen ? "hidden" : ""
              } `}
            >
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard") ? "text-primary-color" : ""
                }`}
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LuLayoutDashboard className="text-2xl" />
                </Link>
              </li>
              
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard/conversations")
                    ? "text-primary-color"
                    : ""
                }`}
              >
                <Link
                  to="/dashboard/conversations"
                  className="flex items-center gap-2"
                >
                  <AiOutlineMessage className="text-2xl" />
                </Link>
              </li>

              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard/addoffer") ? "text-primary-color" : ""
                }`}
              >
                <Link to="/dashboard/offer" className="flex items-center gap-2">
                  <FaRegEdit className="text-2xl" />
                </Link>
              </li>
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard/speakers") ? "text-primary-color" : ""
                }`}
              >
                <Link
                  to="/dashboard/speakers"
                  className="flex items-center gap-2"
                >
                  <FcSpeaker className="text-2xl" />
                </Link>
              </li>
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard/applicationreceived") ? "text-primary-color" : ""
                }`}
              >
                <Link
                  to="/dashboard/applicationreceived"
                  className="flex items-center gap-2"
                >
                  <SiReaddotcv  className="text-2xl"/>
                </Link>
              </li>
              {/* <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/dashboard/settings") ? "text-primary-color" : ""
                }`}
              >
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2"
                >
                  <IoSettingsOutline className="text-2xl" />
                </Link>
              </li> */}
            </ul>
          </div>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="left"
            enableOverlay={false}
            overlayColor="#fff"
          >
            <div>
              <div className="flex justify-between items-center px-4">
                <Link to={"/dashboard"}>
                  {" "}
                  <img src={logo} alt="" className="w-3/4 " />
                </Link>
                {/* <button onClick={toggleDrawer}>
                  <RxCross1 className="text-3xl text-red-700 hover:text-red-950" />
                </button> */}
              </div>
              {/* Menu item */}
              <div className="pl-10 px-8">
                <ul className="space-y-4">
                  <li
                    className={`flex items-center gap-2 cursor-pointer  ${
                      isActive("/dashboard")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LuLayoutDashboard className="text-xl" />
                      Dashboard
                    </Link>
                  </li>
                 
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/dashboard/conversations")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard/conversations"
                      className="flex items-center gap-2"
                    >
                      <AiOutlineMessage className="text-xl" />
                      Conversations
                    </Link>
                  </li>

                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/dashboard/offer")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard/offer"
                      className="flex items-center gap-2"
                    >
                      <FaRegEdit className="text-xl" />
                      Job Offers
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/dashboard/speakers")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard/speakers"
                      className="flex items-center gap-2"
                    >
                      <FcSpeaker className="text-xl" />
                      Speakers
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/dashboard/applicationreceived")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard/applicationreceived"
                      className="flex items-center gap-2"
                    >
                      <SiReaddotcv  className="text-xl"/>
                      Applications
                    </Link>
                  </li>
                  {/* <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/dashboard/settings")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <IoSettingsOutline className="text-xl" />
                      Settings
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div className="pl-10 flex flex-col space-y-4 mt-10 bottom-6 fixed">
                <button className="btn font-bold">
                  <ImHeadphones />
                  Contact Support
                </button>
                <Link onClick={logout}>
                  <button className="flex gap-2 items-center text-red-500">
                    <IoIosLogOut className="text-2xl" />
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </Drawer>
        </div>
        <div className="w-full mx-auto">
          <Outlet></Outlet>
        </div>
      </div>

      <SchoolDashboardFooter></SchoolDashboardFooter>
    </div>
  );
}
export default SchoolDashboard                 