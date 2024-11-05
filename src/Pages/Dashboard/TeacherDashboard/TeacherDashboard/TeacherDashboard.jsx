import { Link, Outlet, useLocation } from "react-router-dom";
import Drawer from "react-modern-drawer";
import React from "react";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import logo from "../../../../assets/login/logo.png";
import "../../SchoolDashboard/SchoolDahsboard/SchoolDashboard.css";
import { ImCross, ImHeadphones } from "react-icons/im";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit, FaRegFileCode } from "react-icons/fa";
import { BsFillPeopleFill, BsHouseDoor } from "react-icons/bs";

import { IoIosLogOut, IoIosStats } from "react-icons/io";
import SchoolDashboardFooter from "../../../../Shared/SchoolDashboardFooter/SchoolDashboardFooter";
import { FcSpeaker } from "react-icons/fc";
import { BiSolidContact } from "react-icons/bi";
import { FaRegNoteSticky } from "react-icons/fa6";
import TeacherDashboardNavbar from "../../../../Shared/TeacherDashboardNavbar/TeacherDashboardNavbar";
function TeacherDashboard() {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleDrawer = () => {
    // setIsOpen((prevState) => !prevState);
  };
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <TeacherDashboardNavbar></TeacherDashboardNavbar>

      <div className="flex ">
        <div className={`h-screen z-40   ${isOpen ? "w-96" : "w-0 "}`}>
          <div className="bg-red-800 p-4">
            <button
              onClick={toggleDrawer}
              className={`px-4 pt-3 text-3xl animate__animated animate__slideInLeft fixed mt-72 ${
                isOpen ? "hidden" : ""
              } `}
            >
              <AiOutlineMenu />
            </button>
            <ul
              className={`space-y-4 bg-slate-100 rounded  px-4 py-2 animate__animated animate__slideInLeft mt-[340px] fixed ${
                isOpen ? "hidden" : ""
              } `}
            >
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/teacherdashboard") ? "text-primary-color" : ""
                }`}
              >
                <Link
                  to="/teacherdashboard"
                  className="flex items-center gap-2"
                >
                  <BiSolidContact className="text-2xl" />
                </Link>
              </li>
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/teacherdashboard/application")
                    ? "text-primary-color"
                    : ""
                }`}
              >
                <Link
                  to="/teacherdashboard/application"
                  className="flex items-center gap-2"
                >
                  <FaRegFileCode className="text-2xl" />
                </Link>
              </li>
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/teacherdashboard/messaging")
                    ? "text-primary-color"
                    : ""
                }`}
              >
                <Link
                  to="/teacherdashboard/messaging"
                  className="flex items-center gap-2"
                >
                  <AiOutlineMessage className="text-2xl" />
                </Link>
              </li>

              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/teacherDashboard/allestablishment")
                    ? "text-primary-color"
                    : ""
                }`}
              >
                <Link
                  to="/teacherDashboard/allestablishment"
                  className="flex items-center gap-2"
                >
                  <IoIosStats className="text-2xl" />
                </Link>
              </li>
              <li
                className={`flex items-center gap-2 cursor-pointer  ${
                  isActive("/teacherdashboard/opportunities")
                    ? "text-primary-color"
                    : ""
                }`}
              >
                <Link
                  to="/teacherdashboard/opportunities"
                  className="flex items-center gap-2"
                >
                  <FaRegNoteSticky className="text-2xl" />
                </Link>
              </li>
            </ul>
          </div>
          <Drawer
            open={isOpen}
            // onClose={toggleDrawer}
            className="mt-28"
            direction="left"
            enableOverlay={false}
          >
            <div className="">
              <div className="flex justify-between items-center px-4">
                <Link to={"/teacherdashboard"}>
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
                      isActive("/teacherdashboard")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/teacherdashboard"
                      className="flex items-center gap-2"
                    >
                      <BiSolidContact className="text-xl" />
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/teacherdashboard/application")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/teacherdashboard/application"
                      className="flex items-center gap-2"
                    >
                      <FaRegFileCode className="text-xl" />
                      My Applications
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/teacherdashboard/messaging")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/teacherdashboard/messaging"
                      className="flex items-center gap-2"
                    >
                      <AiOutlineMessage className="text-xl" />
                      Messaging
                    </Link>
                  </li>

                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/teacherDashboard/allestablishment")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/teacherDashboard/allestablishment"
                      className="flex items-center gap-2"
                    >
                      <IoIosStats className="text-xl" />
                    Establishment
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/teacherdashboard/opportunities")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/teacherdashboard/opportunities"
                      className="flex items-center gap-2"
                    >
                      <FaRegNoteSticky className="text-xl" />
                      Opportunities
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="pl-10 flex flex-col space-y-4 mt-10 bottom-6 fixed">
                <button className="btn font-bold">
                  <ImHeadphones />
                  Contact Support
                </button>
                <button className="flex gap-2 items-center text-red-500">
                  <IoIosLogOut className="text-2xl" />
                  Logout
                </button>
              </div>
            </div>
          </Drawer>
        </div>

        <div className="w-full mx-auto mt-24">
          <Outlet></Outlet>
        </div>
      </div>

      <SchoolDashboardFooter></SchoolDashboardFooter>
    </div>
  );
}
export default TeacherDashboard;
