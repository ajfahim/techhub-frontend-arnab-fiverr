import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

function Main() {
  const location = useLocation();
  const shouldRenderHeaderFooter = !["/login", "/signUp","/account"].includes(
    location.pathname
  );
  const shouldRenderFooter=!["/message"].includes(location.pathname)

  return (
    <div className="">
      {shouldRenderHeaderFooter && <Navbar />}
      <Outlet />
      {shouldRenderHeaderFooter && shouldRenderFooter && <Footer />}
    </div>
  );
}

export default Main;
