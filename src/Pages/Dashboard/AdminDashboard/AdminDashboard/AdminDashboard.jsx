import { Link, Outlet, useLocation } from "react-router-dom";
import Drawer from "react-modern-drawer";
import React from "react";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import logo from "../../../../assets/login/logo.png";
import { ImCross, ImHeadphones } from "react-icons/im";
import { AiOutlineMenu, AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsFillPeopleFill, BsHouseDoor } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import SchoolDashboardFooter from "../../../../Shared/SchoolDashboardFooter/SchoolDashboardFooter";
import { FcSpeaker } from "react-icons/fc";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function AdminDashboard() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const location = useLocation();
  const { user } = useAuthContext();
  console.log("🚀 ~ SchoolDashboard ~ user:", user);

  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <div className="flex">
        <div className={`h-screen z-40 ${isOpen ? "w-96" : "w-0 "}`}>
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
              className={`flex items-center gap-2 cursor-pointer ${
                isActive("/adminDashboard") ? "text-primary-color" : ""
              }`}
            >
              <Link to="/adminDashboard" className="flex items-center gap-2">
                <LuLayoutDashboard className="text-2xl" />
              </Link>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                isActive("/adminDashboard/userdetails")
                  ? "text-primary-color"
                  : ""
              }`}
            >
              <Link
                to="/adminDashboard/userdetails"
                className="flex items-center gap-2"
              >
                <BsFillPeopleFill className="text-2xl" />
              </Link>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                isActive("/adminDashboard/offers") ? "text-primary-color" : ""
              }`}
            >
              <Link
                to="/adminDashboard/offers"
                className="flex items-center gap-2"
              >
                <FaRegEdit className="text-2xl" />
              </Link>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${
                isActive("/adminDashboard/settings") ? "text-primary-color" : ""
              }`}
            >
              <Link
                to="/adminDashboard/settings"
                className="flex items-center gap-2"
              >
                <IoSettingsOutline className="text-2xl" />
              </Link>
            </li>
          </ul>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="left"
            enableOverlay={true}
            overlayColor="#fff"
          >
            <div>
              <div className="flex justify-between items-center px-4">
                <Link to={"/adminDashboard"}>
                  <img src={logo} alt="" className="w-3/4 " />
                </Link>
                <button onClick={toggleDrawer}>
                  <RxCross1 className="text-3xl text-red-700 hover:text-red-950" />
                </button>
              </div>
              {/* Menu item */}
              <div className="pl-10 px-8">
                <ul className="space-y-4">
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/adminDashboard")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LuLayoutDashboard className="text-xl" />
                      Admin Dashboard
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/adminDashboard/userdetails")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/adminDashboard/userdetails"
                      className="flex items-center gap-2"
                    >
                      <BsFillPeopleFill className="text-xl" />
                      User Details
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/adminDashboard/offers")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/adminDashboard/offers"
                      className="flex items-center gap-2"
                    >
                      <FaRegEdit className="text-xl" />
                      Offers
                    </Link>
                  </li>
                  <li
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive("/adminDashboard/settings")
                        ? "bg-primary-color text-white p-4 rounded-lg"
                        : ""
                    }`}
                  >
                    <Link
                      to="/adminDashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <IoSettingsOutline className="text-xl" />
                      Settings
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
        <div className="w-full mx-auto">
          <Outlet></Outlet>
        </div>
      </div>

      <SchoolDashboardFooter></SchoolDashboardFooter>
    </div>
  );
}

export default AdminDashboard;
