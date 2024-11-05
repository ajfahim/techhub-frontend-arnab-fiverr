import React, { useEffect, useState } from "react";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const buttonLabels = [
  "Subject", // corresponds to 'keywords'
  "Location", // corresponds to 'address'
  "Job Type", // corresponds to 'faceToFace' or 'remotely'
  "Salary", // corresponds to 'salary'
  "Experience Level", // corresponds to 'experienceLevel'
];

function MyApplications() {
  const {user} = useAuthContext();
  const [jobInfos, setJobinfos] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    const response = await fetch(`http://localhost:4000/api/application/myApplications/${user?.user?._id}`);
    const data = await response.json();
    setJobinfos(data);
    setFilteredJobs(data);
    console.log('jobs', data);
  };


  useEffect(() => {
    if(user?.user?._id){
      fetchJobs();
    }
  }, [user]);

  const handleApply = (jobId, school) => {
    navigate(`/teacherDashboard/applyJob/${jobId}`, { state: { jobId, school } });
  };

  const handlejobview = (jobId, school) => {
    navigate(`/teacherDashboard/singlejobview/${jobId}`, { state: { jobId, school } });
  };

  const getSchool = (ID) => {
    const dat = schools.filter((sc) => {
      return sc._id === ID;
    });
    return dat[0];
  };



  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <div>
          <h1 className="text-2xl font-semibold mt-16 text-center">
            My Applications
          </h1>
          {/* <ButtonGroup labels={buttonLabels} onSearch={handleSearch} /> */}

          <h1 className="text-xl font-semibold my-6">
            {filteredJobs.length} Applications
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs?.map((jobInfo, index) => (
              <div
                key={index}
                className="bg-white border shadow-lg rounded-2xl p-4 flex flex-col justify-between gap-2"
              >
                <div>
                  <h2 className="text-xl font-semibold">{jobInfo?.offerData?.title}</h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    {jobInfo?.schoolData?.schoolName}
                    <IoLocationOutline className="text-red-500" />
                    {jobInfo?.schoolData?.address} {jobInfo?.offerData?.date}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <p className="font-bold text-primary-color border-2 border-primary-color rounded-lg p-1 text-sm">
                      Deadline: {jobInfo?.offerData?.deadline}
                    </p>
                    <p className="font-bold text-primary-color border-2 border-primary-color rounded-lg p-1 text-sm">
                      Salary: {jobInfo?.offerData?.salary}
                    </p>
                  </div>
                  <p className="text-gray-800 my-2">{jobInfo?.offerData?.eduObjective}</p>
                  <div className="flex flex-wrap my-2">
                    {jobInfo?.offerData?.faceToFace && (
                      <span
                        className={`bg-gray-200 text-black-800 text-sm px-2 py-1 rounded-full mr-2`}
                      >
                        Offline
                      </span>
                    )}
                    {jobInfo?.offerData?.remotely && (
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
                    {jobInfo?.offerData?.keywords?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-color text-white text-sm px-3 py-2 rounded-full mr-2 mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApplications;
