
import { BsFillCaretDownFill } from "react-icons/bs";
import TeacherDashboardNavbar from "./../../../../Shared/TeacherDashboardNavbar/TeacherDashboardNavbar"; import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { MdAssignment, MdCheckCircle, MdSend } from "react-icons/md";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
function TeacherDashboardActivity() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement your search logic here
  };
  const statuses = [
    { title: "To Offers", count: 5, icon: <MdAssignment /> },
    { title: "Spontaneous", count: 6, icon: <MdSend /> },
    { title: "Accepted", count: 10, icon: <MdCheckCircle /> },
  ];

  return (
    <div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <h1 className="font-bold text-2xl mt-6">Your Activity</h1>

        <div className="bg-white border rounded-full flex items-center shadow-sm px-4 py-2  w-full mt-6">
          <button className="flex items-center text-gray-500 mr-4">
            <span> Add filter</span> <BsFillCaretDownFill className="ml-2" />
          </button>
          <AiOutlineSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for a job"
            value={searchTerm}
            onChange={handleSearchChange}
            className="outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-12 mt-12">
          {statuses.map((status, index) => (
            <div key={index} className=" bg-white rounded-lg shadow-md p-4 border">
              <div className="flex  justify-between">
                <div className="text-primary-color font-bold text-lg">
                  {status.title}
                </div>
                <Link to={`${status.title === 'To Offers' && '/teacherdashboard/opportunities'}`} className="icon bg-primary-color bg-opacity-20 p-2 rounded-full">
                  {status.icon}
                </Link>
              </div>
              <div className="text-gray-500">Count</div>
              <div className="text-primary-color font-bold text-xl">

                <CountUp end={status.count} duration={2}></CountUp>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TeacherDashboardActivity