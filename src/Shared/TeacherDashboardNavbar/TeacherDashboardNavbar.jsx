import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../assets/login/logo.png"; // Ensure path is correct
import profile from "../../assets/login/profile.png"; // Ensure path is correct
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

function TeacherDashboardNavbar() {
  // Function to handle search, could integrate with routing or state management
  const handleSearch = () => {
    console.log("Search Job clicked");
  };

  const { logout } = useLogout();

  return (
    <div>
      <nav className=" fixed navbar bg-base-100 px-4 md:px-20 lg:px-28 shadow-lg z-50">
        <div className="flex-1 flex items-center gap-12">
          <Link to={'/'}>
            {" "}
            <img src={logo} alt="Logo" className="w-48" />
          </Link>
          <button
            className="btn hidden lg:block bg-primary-color text-white"
            onClick={handleSearch}
          >
            Search Job
          </button>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 hidden lg:flex">
              <IoNotificationsOutline className="text-xl " />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>No notifications</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex gap-2 items-center cursor-pointer"
            >
              <img
                src={profile}
                alt="User Profile"
                className="rounded-full w-12 h-12"
              />
              <span className="hidden lg:block">Name</span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/teacherDashboard/profile"}>Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TeacherDashboardNavbar;
