import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import CountUp from "react-countup";
import { CgProfile } from "react-icons/cg";
import { GiProcessor } from "react-icons/gi";
import { GoPlus } from "react-icons/go";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuSchool2 } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Activity() {
  const { user } = useAuthContext();
  const [offers, setoffers] = useState([]);
  const [receivedApplications, setreceivedApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("Establishments");

  const tabs = ["Establishments", "Unsolicited Applications"];
  // const applications = [
  //   "Application to be Processed",
  //   "Application to be Processed",
  //   "Application to be Processed",
  // ];

  const data = {
    labels: [
      "Offers Created",
      "Views of Offers",
      "Application Accepted",
      "Application Received",
    ],
    datasets: [
      {
        label: "Count",
        data: [offers.length, 68, 15, receivedApplications.length],
        backgroundColor: ["#3AAFA9", "#29ABE2", "#76E3EA", "#F9E354"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.data[context.dataIndex] === 27
              ? "360" // Custom label for 'Offers Created'
              : context.dataset.data[context.dataIndex];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 73,
      },
    },
  };

  const fetchOffers = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/api/offer/getOffers/schoolDashboard/${user?.user?._id}`
    );
    const data = await response.json();
    console.log("offers", data);
    setoffers(data);
  };
  const fetchApplication = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/api/application/getapplicationBySchool/${user?.user?._id}`
    );
    const data = await response.json();
    setreceivedApplications(data);
    console.log("Application", data);
  };
  useEffect(() => {
    if (user?.user?._id) {
      fetchOffers();
      fetchApplication();
    }
  }, [user]);

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-4 md:px-20 lg:px-28 mt-6 ">
        <div className="flex flex-col lg:flex-row justify-between mb-10">
          <div className="flex lg:text-4xl items-center">
            <CgProfile className="text-5xl mr-1 text-primary-color" />
            <h1 className="text-primary-color">
              Hellow {user?.user?.firstname}
            </h1>
          </div>
          <div className="flex lg:text-4xl items-center">
            <h1 className="mr-1 ">{user?.user?.schoolName}</h1>
            <LuSchool2 />
          </div>
        </div>
        <div className="flex items-center border-t p-2">
          <IoHomeOutline className="text-primary-color mr-3" />
          <span>/ Dashboard</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Your Activity</h1>
          <Link to={"/dashboard/addoffer"}>
            <button className="btn bg-primary-color text-white flex items-center gap-2 px-4 py-2 rounded-md">
              <GoPlus />
              Add an Offer
            </button>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row justify-around gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-md p-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">
                Application to be Processed
              </h1>
              <Link
                to={"/dashboard/applicationreceived"}
                className="btn bg-primary-color bg-opacity-40"
              >
                <GiProcessor />
              </Link>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <h2 className="text-md font-medium">Pending</h2>
                <CountUp
                  end={10}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
              <div>
                <h2 className="text-md font-medium">Completed</h2>
                <CountUp
                  end={20}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-md p-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Active Offer</h1>
              <Link
                to={"/dashboard/offer"}
                className="btn bg-primary-color bg-opacity-40"
              >
                <MdOutlineLocalOffer />
              </Link>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <h2 className="text-md font-medium">Active</h2>
                <CountUp
                  end={10}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
              <div>
                <h2 className="text-md font-medium">Completed</h2>
                <CountUp
                  end={15}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-md p-4 flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Unread Notification</h1>
              <button className="btn bg-primary-color bg-opacity-40">
                <IoNotificationsOutline />
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <h2 className="text-md font-medium">Unread</h2>
                <CountUp
                  end={10}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
              <div>
                <h2 className="text-md font-medium">Read</h2>
                <CountUp
                  end={10}
                  duration={3}
                  delay={1}
                  className="font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Establishment section */}
        <div className="mt-8">
          <div className="flex flex-col lg:flex-row md:flex-row gap-4 justify-between items-center ">
            <h1 className="text-xl font-bold">Your Establishments</h1>
            <Link to={"/dashboard/addestablish"}>
              <button className="btn  bg-primary-color text-white flex items-center gap-2 px-4 py-2 rounded-md">
                <GoPlus />
                Add an Establishments
              </button>
            </Link>
          </div>
          {/* <div className="">
            <div className="  bg-white rounded-lg">
              <div className=" my-6 flex justify-between items-center ">
                <div className="flex mb-6 border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 ${activeTab === tab
                        ? "border-b-2 border-teal-500 text-teal-500"
                        : "text-gray-600"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button className="hidden lg:block md:block bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-gray-300 mr-4">
                  Show Archived Properties
                </button>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {applications.map((application, index) => (
                  <div
                    key={index}
                    className=" rounded-lg p-8 shadow-md border flex flex-col justify-between"
                  >
                    <div className="text-lg font-semibold mb-4">
                      {application}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
                        <FaDownload className="text-black" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
                        <FaInfoCircle className="text-black" />
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded">
                        <FaTrashAlt className="text-black" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
        {/* Matching Progress section */}
        <div>
          <h1 className="font-bold text-xl py-5 mt-8">Matching Progress </h1>
          <div className="bg-white p-5 rounded-lg shadow-lg border">
            <div className="join">
              <select className="select input-bordered join-item rounded-l-full">
                <option value="" disabled selected>
                  Add filter
                </option>
                <option value="">A</option>
                <option value="">B</option>
              </select>
              <input
                className="input input-bordered join-item w-full"
                placeholder="Search for a job or title"
              />
            </div>
            <div className="overflow-x-auto mt-6">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Job title</th>
                    <th>Progress</th>
                    <th>Status </th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer, index) => (
                    <tr key={index}>
                      <td>{offer?.title}</td>
                      <td>
                        {offer?.recievedOffers.length > 0 ? (
                          <progress
                            className="progress progress-success w-56"
                            value="50"
                            max="100"
                          ></progress>
                        ) : (
                          <progress
                            className="progress progress-success w-56"
                            value="0"
                            max="100"
                          ></progress>
                        )}
                      </td>
                      {offer?.recievedOffers.length > 0 && <td>Ongoing</td>}
                      {offer?.recievedOffers.length === 0 && (
                        <td>No Application</td>
                      )}
                    </tr>
                  ))}

                  {/* <tr className="hover bg-slate-50">
                    <td>Supply chain and purchasing</td>
                    <td>
                      <progress
                        className="progress progress-accent w-56"
                        value="70"
                        max="100"
                      ></progress>
                    </td>
                    <td>Progress</td>
                  </tr>
                  
                  <tr>
                    <td>Writing educational content </td>
                    <td>
                      <progress
                        className="progress progress-success w-56"
                        value="100"
                        max="100"
                      ></progress>
                    </td>
                    <td>Completed</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Application Received section */}
        <div>
          <h1 className="font-bold text-xl py-5 mt-8">Application Received</h1>
          <div className="bg-white p-5 rounded-lg shadow-lg border">
            <div className="join">
              <select className="select input-bordered join-item rounded-l-full">
                <option value="" disabled selected>
                  Add filter
                </option>
                <option value="">A</option>
                <option value="">B</option>
              </select>
              <input
                className="input input-bordered join-item w-full"
                placeholder="Search for a teacher"
              />
            </div>
            <h1 className="font-bold my-5">
              Job Title: Primary Mathematics Teacher
            </h1>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Teacher Name</th>
                    <th>Qualifications</th>
                    <th>Rating</th>
                    <th>Expected Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedApplications.map((application, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  application.profileImage ||
                                  "https://via.placeholder.com/40"
                                }
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{`${application.firstName} ${application.lastName}`}</div>
                          </div>
                        </div>
                      </td>
                      <td>{application.qualifications || "N/A"}</td>
                      <td>{application.rating || "N/A"}</td>
                      <td>{application.expectedSalary || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Statics section */}
        <div>
          <h1 className="font-bold text-xl py-5 mt-8">Your Statistics </h1>
          <div className="bg-white p-5 rounded-lg shadow-lg border">
            <div className="flex gap-6 items-center w-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                alt="Avatar Tailwind CSS Component"
                className="rounded-full"
              />
              <div className=" w-full space-y-4">
                <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                  <select className="select select-accent w-full max-w-xs">
                    <option disabled selected>
                      Me
                    </option>
                    <option>Auto</option>
                    <option>Dark mode</option>
                    <option>Light mode</option>
                  </select>
                  <select className="select select-accent w-full max-w-xs">
                    <option disabled selected>
                      Select
                    </option>
                    <option>Auto</option>
                    <option>Dark mode</option>
                    <option>Light mode</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row gap-5 items-center">
                  <label className="label   cursor-pointer ">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500 mr-3 "
                      defaultChecked
                    />
                    <span className="label-text">
                      Offres actives uniquement
                    </span>
                  </label>
                  <label className="label cursor-pointer ">
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500 mr-3 "
                      defaultChecked
                    />
                    <span className="label-text">Toutes les offres</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-11">
              <h1 className="font-bold text-xl mb-2">Golbal</h1>
              <p className="mb-8">
                📣 Offers and applications From the selected user, depending on
                the selected establishments
              </p>
              <div className="overflow-x-auto mx-auto w-full  ">
                <Bar data={data} options={options} />
              </div>
            </div>
            <div className="mt-11">
              <p>
                💬 Offers and application From the selected user, depending on
                the selected establishment
              </p>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg mt-5">
                  <div>
                    <p>Number of Active Job Posting</p>
                    <p className="mt-8">Received</p>
                    <CountUp end={13} duration={1} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg mt-5">
                  <div>
                    <p>Number of Applications Received</p>
                    <p className="mt-8">Sent</p>
                    <CountUp end={53} duration={3} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg mt-5">
                  <div>
                    <p>Number of Interviews Scheduled</p>
                    <p className="mt-8">Time</p>
                    <CountUp end={13} duration={1} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg mt-5">
                  <div>
                    <p>Number of Position Filled</p>
                    <p className="mt-8">Received</p>
                    <CountUp end={18} duration={2} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg mt-5">
                  <div>
                    <p>Average Time to fll a Position</p>
                    <p className="mt-8">Sent</p>
                    <CountUp end={13} duration={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Golbal section */}
      </div>
    </div>
  );
}

export default Activity;
