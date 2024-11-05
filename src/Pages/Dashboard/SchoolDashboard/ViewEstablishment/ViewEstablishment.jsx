import { Link } from "react-router-dom";
import Navbar from "../../../../Shared/Navbar/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiPresentationChartBold } from "react-icons/pi";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";

function ViewEstablishment() {
  const { user } = useAuthContext();
  const [school,setSchool] = useState(null);
  const fetchSchool = async()=>{
    const response = await fetch(`http://localhost:4000/api/user/getUser/${user?.user?._id}`);

    const data = await response.json();

    setSchool(data);
  }
  useEffect(() => {
    if (user?.user?._id) {
      fetchSchool();
    }
  }, [user]);
  return (
    <div>
      <Navbar></Navbar>

      <div className="px-4 md:px-10  lg:px-28 my-6 max-w-[1440px] mx-auto">
        <div className="bg-primary-color text-center text-white py-5">
          <h1 className="font-bold text-5xl  my-3">{school?.schoolName}</h1>
          <p className="font-bold text-3xl">{school?.address}</p>
        </div>
        <div className="flex justify-between mt-7">
          <button className=" btn bg-primary-color text-white">
            <span className="mr-3">{school?.facilityName}</span> <span>{school?.establishmentType}</span>
          </button>
          <Link to='/dashboard/addestablish'>
            <button className="btn bg-primary-color text-white">
              <FaRegEdit />
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row  gap-4 ">
          <div className="border bg-slate-50 my-6 p-4 rounded-lg md:w-[50%] lg:w-[30%]">
            <h1 className="flex gap-2 items-center font-bold">
              <LiaChalkboardTeacherSolid className="text-primary-color text-3xl" />
              Areas of teaching
            </h1>

            <div className="my-4">
              <ul className="flex flex-col space-y-2">
                {
                  school?.teachingArea?.map((ta) => (
                    <li key={ta} className="w-full">
                      <div className="btn bg-primary-color text-white w-full">
                        {ta}
                      </div>
                    </li>

                  ))
                }

              </ul>
            </div>
          </div>
          <div className="border bg-slate-50 my-6 p-4 rounded-lg md:w-[50%] lg:w-[70%]">
            <h1 className="font-bold flex gap-3 items-center text-xl">
              <PiPresentationChartBold className="text-3xl text-primary-color mb-6" />
              Presentation
            </h1>

            <p>
              {school?.presentation}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewEstablishment