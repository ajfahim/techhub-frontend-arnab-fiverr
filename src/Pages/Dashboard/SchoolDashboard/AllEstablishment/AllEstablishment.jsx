import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { LuSchool2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import hasina from "../../../../../src/assets/Teachers/hasina.png";
import bgImg from "../../../../../src/assets/Teachers/img1.png";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup"; // Importing ButtonGroup component

function AllEstablishment() {
  const [establishments, setEstablishments] = useState([]); // State to hold the fetched establishments
  const [filteredEstablishments, setFilteredEstablishments] = useState([]); // State to hold filtered establishments

  const fetchEstablishments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getUser`
      ); // Fetching the establishments data from the API
      const data = await response.json();
      const filteredData = data.filter((user) => user.role === "school-owner"); // Filtering by role to get only school owners
      setEstablishments(filteredData);
      setFilteredEstablishments(filteredData); // Initially set filteredEstablishments to all data
      console.log("establishments", filteredData);
    } catch (error) {
      console.error("Error fetching establishments:", error);
    }
  };

  useEffect(() => {
    fetchEstablishments(); // Fetch establishments when the component is mounted
  }, []);

  // Search handler function that filters establishments based on the provided inputs
  const handleSearch = (inputs) => {
    const filtered = establishments.filter((establishment) =>
      Object.keys(inputs).every((key) =>
        inputs[key]
          ? establishment[key]
              ?.toLowerCase()
              .includes(inputs[key].toLowerCase())
          : true
      )
    );
    setFilteredEstablishments(filtered); // Update the filtered establishments
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-20 lg:px-28">
      <div className="flex flex-col lg:flex-row justify-between mb-10 border-l-2 border-primary-color px-4 py-8">
        <div className="flex lg:text-4xl items-center">
          <CgProfile className="text-5xl mr-1 text-primary-color" />
          <h1 className="text-primary-color">Hello user,</h1>
        </div>
        <div className="flex lg:text-4xl items-center">
          <h1 className="mr-1">School Name</h1>
          <LuSchool2 />
        </div>
      </div>
      <h1 className="font-bold mb-6">
        Discover the showcases published by the establishments that recruit on
        TechHub
      </h1>

      {/* Implementing the ButtonGroup component for filtering */}
      <ButtonGroup
        labels={["address", "Department", "establishmentType", "keywords"]}
        onSearch={handleSearch} // Passing the search handler to ButtonGroup
      />

      <div className="flex justify-between mt-10 items-center">
        <h1 className="font-semibold">
          {filteredEstablishments.length} showcases published on these criteria
        </h1>
        <Link to={"/dashboard/addestablish"}>
          <button className="btn bg-primary-color text-white">
            <FaPlus />
            Add an Establishment
          </button>
        </Link>
      </div>
      {/* changes */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {filteredEstablishments.map((establishment) => (
          <div
            key={establishment.id}
            className="border rounded-xl overflow-hidden flex flex-col h-full"
          >
            <div
              className="flex-grow bg-cover bg-center  "
              style={{ backgroundImage: `url(${bgImg})` }}
            >
              <div className="flex justify-between p-4 bg-gradient-to-t from-black to-transparent ">
                <h1 className="text-xl font-bold text-white py-6">
                  {establishment.schoolName}
                </h1>
                <img src={hasina} alt="Icon" className="w-8 h-8 rounded-full" />
              </div>
              <div className="flex-grow bg-slate-300 h-full p-4  bg-opacity-80">
                <h2 className="text-lg font-semibold">
                  Establishment Type: {establishment.establishmentType}
                </h2>
                <h3>
                  <span className="font-semibold">Address</span>:{" "}
                  {establishment.address}
                </h3>
                <p>
                  <span className="font-semibold">Description</span>:
                  {establishment.presentation}
                </p>
              </div>
            </div>
            <div className="flex border-t border-slate-300 mt-auto">
              <Link
                to={`/teacherDashboard/allestablishment/${establishment._id}`}
                className="btn w-1/2 border-r-2 border-primary-color text-primary-color rounded-none flex items-center justify-center"
              >
                Preview
              </Link>
              <button className="btn w-1/2 text-white bg-primary-color rounded-none">
                See The Showcase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEstablishment;
