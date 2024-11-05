import { AiOutlineShareAlt } from "react-icons/ai";
import TeacherDashboardNavbar from "../../../../Shared/TeacherDashboardNavbar/TeacherDashboardNavbar"
import { IoLocationOutline } from "react-icons/io5";
import { GoGoal, GoInfo } from "react-icons/go";
import { MdDescription, MdLocationOn, MdSchool, MdSlideshow, MdTagFaces } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { BsFile, BsFiles, BsFilterSquare } from "react-icons/bs";
import { IoIosArrowDropright } from "react-icons/io";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
function SingleJobView() {
  const { id } = useParams();
  const location = useLocation();

  const school = location.state?.school;
  const jobId = location.state?.jobId;

  
  const [jobInfos, setJobinfos] = useState({});
  const [schoolInfo,setSchoolInfo]=useState(null);

  const fetchJob = async () => {
    const response = await fetch(`http://localhost:4000/api/offer/jobs/${id}`);
    const data = await response.json();
    setJobinfos(data);
    console.log("jobs", data);
  };
  const fetchSchool = async () => {
    const response = await fetch(`http://localhost:4000/api/user/getSchools/${school?._id}`);
    const data = await response.json();
    setSchoolInfo(data);
    console.log("school", data);
  };
  useEffect(() => {
    fetchJob();
    fetchSchool();
  }, [id]); //
  console.log(jobInfos);

  const handleApply = () => {
    console.log("Apply button clicked.");
    // Implementation for the apply logic
  };

  // Function to handle sharing
  const handleShare = () => {
    console.log("Share button clicked.");
    // Implementation for the share logic
  };
  const jobs = [
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company A",
      city: "City A",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: [
        "Marketing",
        "Communication",
        "Social networks / E-reputation",
        "Gaming zone",
      ],
      modes: ["Remote", "Offline"],
    },
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company B",
      city: "City B",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: ["Marketing", "Communication", "Gaming zone"],
      modes: ["Remote"],
    },
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company C",
      city: "City C",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: ["Social networks / E-reputation", "Gaming zone"],
      modes: ["Offline"],
    },
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company D",
      city: "City D",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: ["Marketing", "Communication"],
      modes: ["Remote", "Offline"],
    },
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company E",
      city: "City E",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: ["Communication", "Social networks / E-reputation"],
      modes: ["Offline"],
    },
    {
      title: 'Jury for a project "Development of a learning"',
      company: "Company F",
      city: "City F",
      datePosted: "11/02/2024",
      deadline: "12/03/2024",
      tags: ["Marketing", "Gaming zone"],
      modes: ["Remote"],
    },
  ];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: getSlidesPerView(screenWidth), // Function call to determine slides per view
      spacing: 15,
    },
  });

  // Helper function to determine number of slides based on screen width
  function getSlidesPerView(width) {
    if (width < 640) return 1; // sm: 1 slide
    if (width < 1024) return 2; // md: 2 slides
    return 3; // lg: 3 slides
  }
  const [activeTab, setActiveTab] = useState("Keyword1");
  const keywords = [
    "Keyword1",
    "Keyword2",
    "Keyword3",
    "Keyword4",
    "Keyword5",
    "Keyword6",
    "Keyword7",
  ];

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);

      if (slider && slider.current) {
        slider.current.update({
          ...slider.current.options,
          slides: {
            ...slider.current.options.slides,
            perView: getSlidesPerView(newWidth),
          },
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slider]); // Ensure effect runs only if slider instance changes

  return (
    <div>
      <div>
        <div className="bg-primary-color text-white py-6">
          <div className=" max-w-[1440px] mx-auto  flex flex-col gap-6 lg:flex-row justify-between items-center px-4 md:20 lg:px-28">
            <div className="flex-grow">
              <h1 className="font-semibold mt-6 mb-4 text-2xl">
                {jobInfos?.title}
              </h1>
              <div className="flex gap-5">
                <div className="space-y-2">
                  <p className="border p-1 rounded">
                    Deadline: {jobInfos?.deadline}
                  </p>
                  <p className="border p-1 rounded">
                    Salary: {jobInfos.salary}
                  </p>
                </div>
                <div className="space-y-5">
                  <p>Company name : {schoolInfo?.schoolName}</p>
                  <p className="flex items-center gap-1 ">
                    <IoLocationOutline />
                    City name : {schoolInfo?.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex items-center bg-white text-primary-color px-3 py-1 rounded-full"
              >
                <AiOutlineShareAlt className="mr-2" />
                Share
              </button>
              <button
                onClick={handleApply}
                className="bg-white text-primary-color px-3 py-1 rounded-full"
              >
                To Apply
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:20 lg:px-28">
          <div className=" bg-white rounded-lg shadow-lg p-6 my-12 border">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary-color  flex items-center gap-1">
                <GoInfo className="text-2xl" /> The Essential
              </h2>

              <p className=" text-primary-color cursor-pointer border border-primary-color px-2 lg:px-4 py-2 rounded-full">
                In Progress
              </p>
            </div>
            <div className="grid grid-cols-1  lg:grid-cols-4 gap-4">
              {/* Job Post Details */}
              <div>
                <p className="font-semibold text-primary-color">Job Post</p>
                <p>Assistant Teacher</p>
                <p className="mt-2 font-semibold text-primary-color">
                  Half Time/Full Time
                </p>
                <p>Full Time</p>
              </div>

              {/* Company and Location Details */}
              <div>
                <p className="font-semibold text-primary-color">
                  Place and mode of presence
                </p>
                <p>Company name</p>
                <p className="mt-2 flex items-center gap-1 ">
                  <IoLocationOutline className="text-red-600" />
                  City name
                </p>
                <p className="text-white bg-primary-color px-4 py-1 inline-block rounded-full  mt-2">
                  Offline
                </p>
              </div>

              {/* Dates and Time Details */}
              <div>
                <p className="font-semibold text-primary-color">
                  Dates and time volume
                </p>
                <label className="block mb-2">
                  September 4, 2023 <br />
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary-color mr-2"
                  />
                  Flexible
                </label>
                <label className="block mb-2">
                  August 30, 2024 <br />
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary-color mr-2"
                  />
                  Flexible
                </label>
                <p>60 hours</p>
              </div>
              {/*  */}
              <div className="bg-primary-color text-white  rounded-2xl flex items-center justify-center">
                <h1 className="">no available information</h1>
              </div>
            </div>

            {/* Status Indicator */}
          </div>
          {/* Presentation */}
          <div className="bg-white border p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <MdSlideshow className="text-primary-color text-2xl mr-2" />
              <h2 className="text-lg font-bold text-primary-color">
                Presentation of the offer
              </h2>
            </div>
            <p className="text-gray-700">{jobInfos?.presentation}</p>
          </div>
          {/*  */}
          <div className="w-full my-12">
            <div className="flex flex-col lg:flex-row md:flex-row gap-10 w-full">
              {/* Areas of Teaching */}
              <div className="flex-1 bg-white shadow-lg rounded-lg p-4 border">
                <h2 className="flex items-center gap-2 text-primary-color font-bold">
                  <GiTeacher className="text-xl" />
                  Areas of teaching
                </h2>
                <div className="mt-2 p-2 rounded-md">
                  <span className="text-sm bg-primary-color text-white px-3 py-1 rounded-full mr-2">
                    {jobInfos?.teachingArea}
                  </span>
                </div>
              </div>
              {/* Keywords */}
              <div className="flex-1 bg-white shadow-lg rounded-lg p-4 border">
                <h2 className="flex items-center gap-2 text-primary-color font-bold">
                  <BsFilterSquare className="text-xl" />
                  Keywords
                </h2>
                <div className="mt-2 grid grid-cols-2 gap-4 text-center p-2 rounded-md">
                  {jobInfos?.keywords?.length > 0 ? (
                    jobInfos.keywords.map((keyword, index) => (
                      <span
                        className="text-sm bg-primary-color text-white px-3 py-1 rounded-full mr-2 flex items-center justify-center"
                        key={index} // Assuming `keyword` is unique; otherwise, consider a unique id
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <p className="text-center col-span-2">
                      No keywords available
                    </p> // Handling case when no keywords are present
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Eudcation goal */}
          <div className="bg-white border p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <GoGoal className="text-primary-color text-2xl mr-2" />
              <h2 className="text-lg font-bold text-primary-color">
                Education goals
              </h2>
            </div>
            <p className="text-gray-700">
              {jobInfos?.eduObjective}
            </p>
          </div>
          {/* Presentation of the establishment */}
          <div className="bg-white border p-4 rounded-lg shadow-md my-12 ">
            <div className="flex items-center mb-3">
              <MdSlideshow className="text-primary-color text-2xl mr-2" />
              <h2 className="text-lg font-bold text-primary-color">
                Presentation of the establishment
              </h2>
            </div>
            <p className="text-gray-700">{schoolInfo?.presentation}</p>
          </div>
          {/* contact */}
          <div className="bg-white shadow-md rounded-lg  p-4 flex flex-col md:flex-row lg:flex-row gap-6 justify-evenly mt-10 border items-start">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <p>Abc contact: 0180000-123</p>
              <p>Email: abc@mail.com</p>
              <button className="mt-4 bg-primary-color hover:bg-hover-color text-white font-bold py-2 px-6 rounded">
                Contact Us
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Address</h2>
              <p>
                ABZ address 22 Rue des Vignerons, <br /> Vincennes, France
              </p>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">
                Google Map Location
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337048906432!2d2.435715315674891!3d48.845332679286795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e60d4ed6a2597f%3A0xd8e8f636a5c3d16e!2s22%20Rue%20des%20Vignerons%2C%2094300%20Vincennes%2C%20France!5e0!3m2!1sen!2sus!4v1597687872912"
                width="200"
                height="150"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>

          <div className="my-6 flex gap-2">
            <BsFiles className="text-2xl" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7 justify-around items-center  p-1 rounded-full">
              {jobInfos?.keywords?.length > 0 ? (
                jobInfos.keywords.map((keyword, index) => (
                  <span
                    className="text-sm bg-primary-color text-white px-3 py-1 rounded-full mr-2 flex items-center justify-center"
                    key={index} // Assuming `keyword` is unique; otherwise, consider a unique id
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-center col-span-2">No keywords available</p> // Handling case when no keywords are present
              )}
            </div>
          </div>
          {/* Jobs */}
          <div className=" ">
            <div className="flex justify-between items-center my-8">
              <h1 className="text-2xl font-bold">Similar Jobs</h1>
              <IoIosArrowDropright
                className="text-primary-color text-4xl cursor-pointer hover:text-hover-color"
                onClick={() => {
                  if (slider && slider.current) {
                    slider.current.next();
                  }
                }}
              />
            </div>

            <div className="flex flex-col">
              <div ref={sliderRef} className="keen-slider flex ">
                {jobs.map((job) => (
                  <div
                    key={job.id} // Assuming each job has a unique id
                    className="bg-white rounded my-4 rounded-bl-3xl rounded-br-3xl keen-slider__slide flex flex-col"
                  >
                    <div className="border flex-grow">
                      <div className="p-4 flex flex-col justify-between h-full">
                        <div>
                          <h2 className="text-2xl font-bold">{job.title}</h2>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <span>{job.company}</span>
                            <MdLocationOn className="text-red-500" />
                            <span>{job.city}</span>
                            <span className="ml-auto">{job.date}</span>
                          </p>
                          <div className="mt-2">
                            <span className="border-2 border-primary-color rounded-lg text-primary-color px-3 py-1">
                              Deadline: {job.deadline}
                            </span>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
                              Remote
                            </span>
                            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
                              Offline
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="bg-primary-color text-white px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 mt-4">
                          <button
                            className="border-r border-t hover:bg-slate-400 border-r-gray-400 text-sm font-bold py-5 px-4"
                            aria-label="Preview Job"
                          >
                            Preview
                          </button>
                          <button
                            className="border-r border-t hover:bg-slate-400 border-r-gray-400 text-sm font-bold py-5 px-4"
                            aria-label="View Job Offer"
                          >
                            View The Offer
                          </button>
                          <button
                            className="border-t hover:bg-slate-400 text-sm font-bold py-5 px-4"
                            aria-label="Save Job"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="w-full bg-teal-500 hover:bg-teal-700 text-white text-lg font-bold py-3 px-4 rounded-bl-full rounded-br-full mt-auto"
                      aria-label="Apply Now"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleJobView