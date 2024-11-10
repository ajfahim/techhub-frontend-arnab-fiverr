import React, { useEffect, useState } from "react";
import { IoIosHome, IoIosSearch, IoIosStar } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import SchoolNavbar from "../../../../Shared/SchoolNavbar/SchoolNavbar";

const teachers = [
  {
    name: "Kristin Watson",
    qualifications: "PHD",
    subject: "Math",
    ranking: "A",
    image: "https://via.placeholder.com/40", // Placeholder image URL
  },
  {
    name: "Marvin McKinney",
    qualifications: "MSC",
    subject: "English",
    ranking: "B",
    image: "https://via.placeholder.com/40",
  },
  {
    name: "Jane Cooper",
    qualifications: "BSC",
    subject: "Physics",
    ranking: "C",
    image: "https://via.placeholder.com/40",
  },
  {
    name: "Cody Fisher",
    qualifications: "B.com",
    subject: "Chemistry",
    ranking: "A",
    image: "https://via.placeholder.com/40",
  },
];

const labels = ["Name", "Experience", "Location"]; // Removed "Rating" since it's not implemented yet

function ApplicationReceived() {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  // Fetch applications for the school
  const fetchApplication = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/application/getapplicationBySchool/${user?.user?._id}`
    );
    const data = await response.json();
    setApplications(data);
    setFilteredApplications(data);
    console.log("Application", data);
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchApplication();
    }
  }, [user]);

  // Filter based on inputs from the ButtonGroup
  const handleSearch = (inputs) => {
    const filtered = applications.filter((application) => {
      return Object.keys(inputs).every((key) => {
        const value = inputs[key]?.toLowerCase();
        if (!value) return true;

        if (key === "Name") {
          // Combine firstName and lastName for name search
          const fullName =
            `${application.firstName} ${application.lastName}`.toLowerCase();
          return fullName.includes(value);
        }

        if (key === "Experience") {
          return application.experience?.toLowerCase().includes(value);
        }

        if (key === "Location") {
          return application.currentCity?.toLowerCase().includes(value);
        }

        return false;
      });
    });

    setFilteredApplications(filtered);
  };

  // Filter teachers based on search bar input
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(value) ||
        teacher.qualifications.toLowerCase().includes(value) ||
        teacher.subject.toLowerCase().includes(value) ||
        teacher.ranking.toLowerCase().includes(value)
    );

    setFilteredTeachers(filtered);
  };

  return (
    <div>
      <SchoolNavbar />
      <div className="flex items-center px-16 bg-white shadow-2xl border-t py-2">
        <IoIosHome className="text-primary-color text-2xl" /> &nbsp; / speakers
      </div>
      <div className="max-w-[1440px] px-4 md:px-20 lg:px-28 mx-auto">
        <ButtonGroup labels={labels} onSearch={handleSearch} />

        {/* Teacher Ranking */}
        <div>
          <div className="mt-12">
            <div className="bg-white border shadow-md rounded-lg p-4">
              {/* Filter and Search Bar */}
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-4">
                <div className="flex items-center space-x-2 px-2 py-1 border-r border-gray-300">
                  <span>Add filter</span>
                  <IoIosSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for a teacher"
                  className="flex-grow pl-4 py-1 outline-none"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Table */}
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4">Teacher Name</th>
                    <th className="text-left py-2 px-4">Qualifications</th>
                    <th className="text-left py-2 px-4">Subject</th>
                    <th className="text-left py-2 px-4">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 1 ? "bg-blue-50" : ""
                      } hover:bg-gray-100`}
                    >
                      <td className="py-2 px-4 flex items-center space-x-4">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{teacher.name}</span>
                      </td>
                      <td className="py-2 px-4">{teacher.qualifications}</td>
                      <td className="py-2 px-4">{teacher.subject}</td>
                      <td className="py-2 px-4">{teacher.ranking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <p className="my-6">Total Applicants : {filteredApplications.length}</p>
        <div className="flex flex-wrap justify-around">
          {filteredApplications.map((application, index) => (
            <div
              key={index}
              className="max-w-xs border rounded-lg p-4 m-4 shadow-lg"
            >
              <div className="flex items-center justify-between bg-teal-500 text-white p-2 rounded-t-lg">
                <div className="flex items-center">
                  <img
                    src={
                      "https://png.pngtree.com/png-clipart/20230824/original/pngtree-boy-avatar-in-round-web-button-isolated-on-white-picture-image_8377276.png"
                    }
                    alt={application?.firstName}
                    className="w-14 h-14 rounded-full mr-2"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {application?.firstName} {application?.lastName}
                    </h2>

                    <div className="flex items-center">
                      <IoLocationSharp className="mr-1 text-red-600" />
                      <span>{application?.currentCity}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p>{application?.hours} h/week</p>
                  <div className="flex items-center">
                    <IoIosStar className="text-yellow-400 mr-1" />
                    <span>{"5"}</span>
                    <span className="ml-1">★</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b">
                <p>
                  <strong>Education:</strong> {application?.education}
                </p>
                <p>
                  <strong>Experience:</strong> {application?.experience}
                </p>
                <p>
                  <strong>Expected Salary:</strong>{" "}
                  {application?.expectedSalary}
                </p>
                <button className="mt-2 bg-gray-200 text-primary-color px-2 py-1 rounded hover:bg-gray-300">
                  View Profile
                </button>
              </div>
              <div className="flex gap-2 justify-around items-center mt-4">
                <button className="bg-green-100 text-green-600 border border-green-600 px-4 py-1 rounded-full hover:bg-green-600 hover:text-white">
                  Accept
                </button>
                <button className="bg-red-100 text-red-600 border border-red-600 px-4 py-1 rounded-full hover:bg-red-600 hover:text-white">
                  Reject
                </button>
                <button className="bg-blue-100 text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white">
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationReceived;
