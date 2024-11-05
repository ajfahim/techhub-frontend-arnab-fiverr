import { Link, NavLink, useNavigate } from "react-router-dom";
import logo1 from "../../assets/login/logo.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate('/signup', { state: { role } });
};

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s ${location.pathname === "/" ? "text-primary-color" : " "
            } `}
        >
          Home
        </NavLink>
      </li>

      {/* Teachers Dropdown */}
      <li className="relative group">
        <NavLink
          to={"/"}
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s cursor-pointer`}
        >
          Teachers
        </NavLink>
        <ul className="dropdown-content border-2 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute hidden group-hover:block">
          {user?.user?.role === 'teacher' ? <li><Link to={'/teacherdashboard'}>Dashboard</Link></li> : <li><Link>Become a Teacher</Link></li>}
          {!user || !user?.user?.role === 'teacher' ? <li onClick={() => handleRoleSelection('teacher')}><Link>Register</Link></li> : <li><Link to={'/teacherDashboard/opportunities'}>See Offer</Link></li>}
        </ul>
      </li>

      {/* Establishment Dropdown */}
      <li className="relative group">
        <NavLink
          to={"/"}
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s cursor-pointer`}
        >
          Establishment
        </NavLink>
        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute hidden group-hover:block">
          <li><Link>Register as a school</Link></li>
          <li><Link>Post a job offer</Link></li>
          <li><Link>Explore teacher profiles</Link></li>
        </ul>
      </li>

      <li>
        <NavLink
          to="/aboutUs"
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s ${location.pathname === "/aboutUs" ? "text-primary-color" : " "
            } `}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s ${location.pathname === "/contactUs" ? "text-primary-color" : " "
            } `}
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={`hover:border-b-2 hover:border-primary-color transition-all 3s ${location.pathname === "/services" ? "text-primary-color" : " "
            } `}
        >
          Services
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="navbar bg-base-100 lg:px-24 z-30">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={"/"}>
            <img src={logo1} alt="Logo" className="w-32 h-auto" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 space-x-8">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link to={`/profile`}>
              <button className="btn border-primary-color rounded-full hover:bg-primary-color  hover:text-white px-8 mr-5">
                Profile
              </button>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button className="btn border-primary-color rounded-full hover:bg-primary-color  hover:text-white px-8 mr-5">
                Login
              </button>
            </Link>
          )}
          {user ? (
            <Link to={'/'} onClick={logout}>
              <button className="btn border-primary-color rounded-full hover:bg-primary-color  hover:text-white px-8">
                Log Out
              </button>
            </Link>
          ) : (
            <Link to={'/roledecide'}>
              <button className="btn border-primary-color rounded-full hover:bg-primary-color  hover:text-white px-8">
                Register
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
