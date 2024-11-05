import { CgProfile } from "react-icons/cg";
import { LuSchool2 } from "react-icons/lu";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

function SchoolNavbar() {
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
    <div className="flex bg-white shadow-xl flex-col md:flex-row lg:flex-row justify-between    px-16 py-8">
      <div className="flex lg:text-4xl items-center">
        <CgProfile className="text-5xl mr-1 text-primary-color" />
        <h1 className="text-primary-color">Hello {user?.user?.firstname},</h1>
      </div>
      <div className="flex lg:text-4xl items-center ">
        <h1 className="mr-1">{school?.schoolName}</h1>
        <LuSchool2 />
      </div>
    </div>
  );
}
export default SchoolNavbar