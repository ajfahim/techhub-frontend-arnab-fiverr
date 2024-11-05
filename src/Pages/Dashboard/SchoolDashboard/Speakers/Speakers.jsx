import React, { useEffect, useState } from "react";
import { IoIosHome, IoIosStar, IoMdHeartEmpty } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import SchoolNavbar from "../../../../Shared/SchoolNavbar/SchoolNavbar";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const buttonLabels = ["Skills", "Experience", "Location", "Rating"];

function Speakers() {
  const { user } = useAuthContext();
  const [speakers, setSpeakers] = useState([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // Manage active tab

  const fetchSpeakers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/getAllSpeakers`);
      const data = await response.json();
      console.log("Speakers data:", data);
      setSpeakers(data);
      setFilteredSpeakers(data); // Initialize filtered speakers with all speakers
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  // Fetch speakers from API
  useEffect(() => {
    if (user?.user?._id) {
      fetchSpeakers();
    }
  }, [user]);

  // Handle search/filter
  const handleSearch = (inputs) => {
    const filtered = speakers.filter((speaker) =>
      Object.keys(inputs).every((key) => {
        if (!inputs[key]) return true;

        if (key === "Skills") {
          return speaker.skills?.some((skill) =>
            skill.toLowerCase().includes(inputs[key].toLowerCase())
          );
        }

        if (key === "Experience") {
          return speaker.experience?.toLowerCase().includes(inputs[key].toLowerCase());
        }

        if (key === "Location") {
          return speaker.selectCity?.toLowerCase().includes(inputs[key].toLowerCase());
        }

        if (key === "Rating") {
          return speaker.rating?.toString().includes(inputs[key]);
        }

        return false;
      })
    );
    setFilteredSpeakers(filtered);
  };

  // Toggle between tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "favourites") {
      // Assuming speakers have a `isFavourite` field that marks them as favourites
      const favouriteSpeakers = speakers.filter((speaker) => speaker.isFavourite);
      setFilteredSpeakers(favouriteSpeakers);
    } else {
      setFilteredSpeakers(speakers); // Show all speakers
    }
  };

  return (
    <div>
      <SchoolNavbar />
      <div className="flex items-center px-16 bg-white shadow-2xl border-t py-2">
        <IoIosHome className="text-primary-color text-2xl" /> &nbsp; / speakers
      </div>

      {/* Body */}
      <div className="max-w-[1440px] px-4 md:px-20 lg:px-28 mx-auto">
        <ButtonGroup labels={buttonLabels} onSearch={handleSearch} />

        {/* Tab Navigation */}
        <div className="flex mt-4 border-b">
          <button
            className={`flex-1 py-2 ${
              activeTab === "all"
                ? "bg-primary-color text-white"
                : "bg-white text-primary-color border hover:text-hover-color border-primary-color"
            }`}
            onClick={() => handleTabClick("all")}
          >
            All Speakers
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "favourites"
                ? "bg-primary-color text-white"
                : "bg-white text-primary-color border hover:text-hover-color border-primary-color"
            }`}
            onClick={() => handleTabClick("favourites")}
          >
            My Favourite
          </button>
        </div>

        {/* Profile Section */}
        <div>
          <h1 className="font-bold mb-3 mt-8 text-xl">
            {filteredSpeakers?.length} profiles available on these criteria
          </h1>
          <div className="flex flex-wrap justify-around">
            {filteredSpeakers?.map((speaker, index) => (
              <div
                key={index}
                className="max-w-xs border rounded-lg p-4 m-4 shadow-lg"
              >
                <div className="flex items-center justify-between bg-teal-500 text-white p-2 rounded-t-lg">
                  <div className="flex items-center">
                    <img
                      src={
                        speaker.profileImage || "https://via.placeholder.com/40"
                      }
                      alt={speaker.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{speaker?.firstname} {speaker?.lastname}</h2>
                      <div className="flex items-center">
                        <IoLocationSharp className="mr-1 text-red-600" />
                        <span>{speaker.selectCity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{speaker.minWeeklyHours || "N/A"} h/week</p>
                    <div className="flex items-center">
                      <IoIosStar className="text-yellow-400 mr-1" />
                      <span>{speaker.rating || "N/A"}</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-b">
                  <p>
                    <strong>Education:</strong> {speaker.education || "N/A"}
                  </p>
                  <p>
                    <strong>Experience:</strong> {speaker.experience || "N/A"}
                  </p>
                  <p>
                    <strong>Bio:</strong> {speaker.bio || "No bio available"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {speaker.skills &&
                    speaker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary-color text-white px-2 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
                <div className="flex justify-between gap-3 items-center mt-4 border-t pt-2">
                  <button className="bg-gray-200 text-primary-color px-2 py-1 rounded hover:bg-gray-300">
                    Preview
                  </button>
                  <button className="bg-gray-200 text-primary-color px-2 py-1 rounded hover:bg-gray-300">
                    View profile
                  </button>
                  <IoMdHeartEmpty className="text-primary-color text-2xl cursor-pointer hover:text-teal-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speakers;
