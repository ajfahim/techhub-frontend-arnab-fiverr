import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../../assets/Footer/wave.svg";
import logo from "../../assets/login/image.png";

function SchoolDashboardFooter() {
    return (
      <>
        <div
          className="bg-cover bg-no-repeat w-full text-center py-10 relative "
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className="container mx-auto text-white mt-64  max-w-[1440px] ">
            <div className="flex items-center flex-col md:flex-row md:justify-between text-center md:text-left">
              <div className="mt-8 text-white mb-8 md:mb-0 mr-6 md:w-1/4">
                <Link to={"/"}>
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="flex flex-col mb-8 md:mb-0 md:w-1/4">
                <h6 className="footer-title">Resources</h6>
                <Link className="link link-hover" to="/branding">
                  The TechHub
                </Link>
                <Link className="link link-hover" to="/design">
                  Partner Schools
                </Link>
                <Link className="link link-hover" to="/marketing">
                  Blog & Teaching Tips
                </Link>
                <Link className="link link-hover" to="/advertisement">
                  FQAs
                </Link>
              </div>
              <div className="flex flex-col mb-8 md:mb-0 md:w-1/4">
                <h6 className="footer-title">How it works</h6>
                <Link className="link link-hover" to="/about-us">
                  About
                </Link>
                <Link className="link link-hover" to="/contact">
                  Who are we?
                </Link>
                <Link className="link link-hover" to="/jobs">
                  We are recruiting
                </Link>
              </div>
              <div className="flex flex-col md:w-1/4">
                <h6 className="footer-title">Contact Us</h6>
                <a className="link link-hover" href="tel:+9198765432154">
                  (91) 98765 4321 54
                </a>
                <a className="link link-hover" href="mailto:support@mail.com">
                  support@mail.com
                </a>
              </div>
            </div>
          </div>
          {/* <div className="h-1 bg-white w-full px-0"></div> */}
          <p className="mx-auto mt-5  text-white border-t">
            @All copyright reserved by TechHub
          </p>
        </div>
      </>
    );
}

export default SchoolDashboardFooter;
