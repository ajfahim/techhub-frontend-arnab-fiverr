import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup";

const buttonLabels = [
  "Subject", // corresponds to 'keywords'
  "Location", // corresponds to 'address'
  "Job Type", // corresponds to 'faceToFace' or 'remotely'
];

function Opportunities() {
  const [jobInfos, setJobinfos] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/offer/getOffers`
    );
    const data = await response.json();
    setJobinfos(data);
    setFilteredJobs(data);
    console.log("jobs", data);
  };

  const fetchSchools = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getSchools`
    );
    const data = await response.json();
    setSchools(data);
    console.log("Schools", data);
  };

  useEffect(() => {
    fetchJobs();
    fetchSchools();
  }, []);

  const handleApply = (jobId, school) => {
    navigate(`/teacherDashboard/applyJob/${jobId}`, {
      state: { jobId, school },
    });
  };

  const handlejobview = (jobId, school) => {
    navigate(`/teacherDashboard/singlejobview/${jobId}`, {
      state: { jobId, school },
    });
  };

  const getSchool = (ID) => {
    const dat = schools.filter((sc) => {
      return sc._id === ID;
    });
    return dat[0];
  };

  const handleSearch = (searchCriteria) => {
    let filtered = jobInfos.filter((job) => {
      return buttonLabels.every((label) => {
        const value = searchCriteria[label];
        if (!value) return true;

        if (label === "Subject") {
          return job.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(value.toLowerCase())
          );
        }

        if (label === "Location") {
          return getSchool(job.school)
            ?.address.toLowerCase()
            .includes(value.toLowerCase());
        }

        if (label === "Job Type") {
          return (
            (value.toLowerCase() === "offline" && job.faceToFace) ||
            (value.toLowerCase() === "remote" && job.remotely)
          );
        }

        return false;
      });
    });

    // Implementing Salary Sorting
    const salarySort = searchCriteria["Salary"];
    if (salarySort) {
      filtered = filtered.sort((a, b) => {
        const salaryA = parseInt(
          a.salary.split("-")[0].replace(/,/g, "").trim()
        );
        const salaryB = parseInt(
          b.salary.split("-")[0].replace(/,/g, "").trim()
        );

        if (salarySort === "low-to-high") {
          return salaryA - salaryB;
        } else if (salarySort === "high-to-low") {
          return salaryB - salaryA;
        }
        return 0;
      });
    }

    setFilteredJobs(filtered);
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <div>
          <h1 className="text-2xl font-semibold mt-6">
            Find the intervention offers that suit you
          </h1>
          <ButtonGroup labels={buttonLabels} onSearch={handleSearch} />

          <h1 className="text-xl font-semibold my-6">
            {filteredJobs.length} Job offers matched
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs?.map((jobInfo, index) => (
              <div
                key={index}
                className="bg-white border shadow-lg rounded-2xl p-4 flex flex-col justify-between gap-2"
              >
                <div>
                  <h2 className="text-xl font-semibold">{jobInfo?.title}</h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    {getSchool(jobInfo?.school)?.schoolName}
                    <IoLocationOutline className="text-red-500" />
                    {getSchool(jobInfo?.school)?.address} {jobInfo?.date}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <p className="font-bold text-primary-color border-2 border-primary-color rounded-lg p-1 text-sm">
                      Deadline: {jobInfo?.deadline}
                    </p>
                    <p className="font-bold text-primary-color border-2 border-primary-color rounded-lg p-1 text-sm">
                      Salary: {jobInfo?.salary}
                    </p>
                  </div>
                  <p className="text-gray-800 my-2">{jobInfo?.eduObjective}</p>
                  <div className="flex flex-wrap my-2">
                    {jobInfo?.faceToFace && (
                      <span
                        className={`bg-gray-200 text-black-800 text-sm px-2 py-1 rounded-full mr-2`}
                      >
                        Offline
                      </span>
                    )}
                    {jobInfo?.remotely && (
                      <span
                        className={`bg-gray-200 text-black-800 text-sm px-2 py-1 rounded-full mr-2`}
                      >
                        Remote
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap mb-4">
                    {jobInfo?.keywords?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-color text-white text-sm px-3 py-2 rounded-full mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      className="bg-primary-color text-white rounded py-2"
                      onClick={() =>
                        handlejobview(jobInfo?._id, getSchool(jobInfo?.school))
                      }
                    >
                      Preview
                    </button>
                    <button
                      className="bg-primary-color text-white rounded py-2"
                      onClick={() =>
                        handlejobview(jobInfo?._id, getSchool(jobInfo?.school))
                      }
                    >
                      View The Offer
                    </button>
                    <button className="bg-primary-color text-white rounded py-2">
                      Save Job
                    </button>
                  </div>
                </div>
                <button
                  className="btn w-full bg-primary-color text-white rounded-lg text-lg"
                  onClick={() =>
                    handleApply(jobInfo?._id, getSchool(jobInfo?.school))
                  }
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Opportunities;
