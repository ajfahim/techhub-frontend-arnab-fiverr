import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiPresentationChartBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function ViewEstablish() {
  const { user } = useAuthContext();
  const [establish, setestablish] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchestablishData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getUser/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the establish data.");
        }
        const data = await response.json();
        setestablish(data); // Assuming the API returns a single establishment object
      } catch (error) {
        console.error("Error fetching the establish data:", error);
      }
    };

    if (id) {
      fetchestablishData();
    }
  }, [id]);

  return (
    <div>
      <div className="px-4 md:px-10  lg:px-28 my-6 max-w-[1440px] mx-auto">
        <div className="bg-primary-color text-center text-white py-5">
          <h1 className="font-bold text-5xl my-3">
            {establish?.establishName}
          </h1>
          <p className="font-bold text-3xl">{establish?.address}</p>
        </div>
        <div className="flex justify-between mt-7">
          <button className="btn bg-primary-color text-white">
            <span className="mr-3">{establish?.facilityName}</span>{" "}
            <span>{establish?.establishmentType}</span>
          </button>
          <Link to="">
            <button className="btn bg-primary-color text-white">
              <FaRegEdit />
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-4 ">
          <div className="border bg-slate-50 my-6 p-4 rounded-lg md:w-[50%] lg:w-[30%]">
            <h1 className="flex gap-2 items-center font-bold">
              <LiaChalkboardTeacherSolid className="text-primary-color text-3xl" />
              Areas of teaching
            </h1>

            <div className="my-4">
              <ul className="flex flex-col space-y-2">
                {establish?.teachingArea?.map((ta, index) => (
                  <li key={index} className="w-full">
                    <div className="btn bg-primary-color text-white w-full">
                      {ta}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border bg-slate-50 my-6 p-4 rounded-lg md:w-[50%] lg:w-[70%]">
            <h1 className="font-bold flex gap-3 items-center text-xl">
              <PiPresentationChartBold className="text-3xl text-primary-color mb-6" />
              Presentation
            </h1>

            <p>{establish?.presentation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEstablish;
