import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaChalkboard, FaChalkboardTeacher, FaSearch } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Navbar from "../../../../Shared/Navbar/Navbar";

function AddEstablish() {
  const { user } = useAuthContext();
  console.log("🚀 ~ AddEstablish ~ user:", user?.user?._id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: user?.user?.schoolName,
    facilityName: user?.user?.facilityName,
    address: user?.user?.address,
    establishmentType: user?.user?.establishmentType,
    contactPerson: user?.user?.contactPerson,
    teachingArea: user?.user?.teachingArea,
    presentation: user?.user?.presentation,
    solicitedApp: user?.user?.solicitedApp,
    acceptRemindersAfter: user?.user?.acceptRemindersAfter,
    unsolicitedApp: user?.user?.unsolicitedApp,
  });

  const [keywords, setKeywords] = useState("");

  const handleAdd = () => {
    if (keywords.trim() !== "") {
      setFormData({
        ...formData,
        teachingArea: [...formData.teachingArea, keywords.trim()],
      });
      setKeywords("");
    }
  };

  const handleRemove = (index) => {
    const newTeachingArea = [...formData.teachingArea];
    newTeachingArea.splice(index, 1);
    setFormData({ ...formData, teachingArea: newTeachingArea });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const [school, setSchool] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const fetchSchool = async () => {
    if (!firstTime) return;
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getUser/${
        user?.user?._id
      }`
    );

    const data = await response.json();

    setSchool(data);
    setFormData({
      schoolName: data.schoolName,
      facilityName: data.facilityName,
      address: data.address,
      establishmentType: data.establishmentType,
      contactPerson: data.contactPerson,
      teachingArea: data.teachingArea,
      presentation: data.presentation,
      solicitedApp: data.solicitedApp,
      acceptRemindersAfter: data.acceptRemindersAfter,
      unsolicitedApp: data.unsolicitedApp,
    });
    setFirstTime(false);
  };
  useEffect(() => {
    if (user?.user?._id) {
      fetchSchool();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/editEstablishment/${
          user?.user?._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);

      if (response.ok) {
        navigate("/dashboard/viewestablishment");
      } else {
        alert("Failed to update establishment.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the establishment.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <div className="bg-primary-color h-40 border border-white rounded-lg p-5">
          <div className="flex justify-between items-center mt-12 text-3xl text-white">
            <h1 className="text-3xl">{"Edit Establishment"}</h1>
            <label className="flex items-center cursor-pointer">
              <CiCamera className="border rounded-full text-white p-2 text-7xl" />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-20 w-full gap-5 mx-auto bg-white p-5 rounded-3xl shadow-2xl">
            <h1 className="font-bold flex items-center text-xl">
              <IoInformationCircleOutline className="text-2xl text-primary-color" />
              Information
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">School Name</span>
                </div>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Facility Name</span>
                </div>
                <input
                  type="text"
                  name="facilityName"
                  value={formData.facilityName}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-full max-w-xs"
                />
              </label>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">
                    Type of Establishment
                  </span>
                </label>
                <select
                  name="establishmentType"
                  value={formData.establishmentType}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>School</option>
                  <option>University</option>
                  <option>Training Center</option>
                </select>
              </div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Contact Person</span>
                </div>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-full max-w-xs"
                />
              </label>
            </div>
          </div>

          <div className="my-12 shadow-xl p-4 bg-white rounded-xl">
            <div className="flex items-center mb-4">
              <FaChalkboardTeacher className="text-3xl text-teal-600 mr-2" />
              <h1 className="text-xl font-bold">Areas of Teaching</h1>
            </div>
            <div className="flex flex-wrap mb-4">
              {formData?.teachingArea?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-800 mr-2 mb-2 px-3 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => handleRemove(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center bg-teal-50 p-2 rounded-lg">
              <FaSearch className="text-teal-600 mr-2" />
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Keywords"
                className="flex-grow p-2 rounded-lg outline-none"
              />
              <p
                onClick={handleAdd}
                className="ml-2 bg-teal-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              >
                Add
              </p>
            </div>
          </div>

          <div className="p-4 bg-white shadow-xl rounded-xl">
            <div className="flex items-center mb-4">
              <FaChalkboard className="text-3xl text-teal-600 mr-2" />
              <h1 className="text-xl font-bold">Presentation</h1>
            </div>
            <textarea
              name="presentation"
              value={formData.presentation}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              rows="5"
              placeholder="Enter your presentation details here..."
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row gap-5">
            <div className="mt-20 w-full gap-5 mx-auto bg-white p-5 rounded-3xl shadow-2xl lg:w-2/3">
              <h1 className="font-bold mb-4">Unsolicited Applications</h1>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="unsolicitedApp"
                  checked={formData.unsolicitedApp}
                  onChange={handleCheckboxChange}
                  className="toggle"
                />
                <p>Accepting Unsolicited applications</p>
              </div>
              <div className="flex gap-2 mt-6">
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    name="solicitedApp"
                    checked={formData.solicitedApp}
                    onChange={handleCheckboxChange}
                    className="toggle"
                  />
                  <p>Accepting Solicited applications</p>
                </div>
                <input
                  type="text"
                  name="acceptRemindersAfter"
                  value={formData.acceptRemindersAfter}
                  onChange={handleChange}
                  className="input input-bordered w-1/2"
                  placeholder="1 month"
                />
              </div>
            </div>
            <div className="mt-20 w-full gap-5 mx-auto bg-white p-5 rounded-3xl shadow-2xl">
              <h1 className="font-bold mb-4">
                Recipients of Unsolicited Applications
              </h1>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="recipients"
                  value={formData.recipients}
                  onChange={handleChange}
                  placeholder="Enter email addresses separated by a space"
                  className="input rounded-full input-bordered"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow-2xl rounded-xl mt-5">
            <label className="cursor-pointer flex items-center gap-6">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-success"
              />
              <span>
                I agree to the Terms and Conditions of Tech Hub and that the
                above information is correct
              </span>
            </label>
          </div>

          <div className="text-right mt-8">
            <button type="submit" className="btn bg-primary-color text-white">
              {"Add Establishment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEstablish;
