import { useEffect, useState } from "react";
import TeacherDashboardNavbar from "../../../../Shared/TeacherDashboardNavbar/TeacherDashboardNavbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function ApplyJob() {

  const {user} = useAuthContext();

  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const school = location.state?.school;
  const jobId = location.state?.jobId;

  const [formData, setFormData] = useState({
    schoolId:school?._id,
    offerId: jobId,
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    education: "",
    experience: "",
    expectedSalary: "",
    currentCity: "",
    availableStartDate: "",
    summary: "",
    file: null,
    isSubscribed: false,
  });

  useEffect(()=>{
    if(user?.user?._id){
      setFormData({
        teacherId:user?.user?._id,
        schoolId:school?._id,
        offerId: jobId,
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        education: "",
        experience: "",
        expectedSalary: "",
        currentCity: "",
        availableStartDate: "",
        summary: "",
        file: null,
        isSubscribed: false,
      });
    }
  },[user])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();





    fetch("http://localhost:4000/api/application/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Form submitted:", data);
        if (data._id) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Applied Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/teacherDashboard/application');
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };





  return (
    <>
      <div className="bg-primary-color p-8 px-4 md:px-20 lg:px-28">
        <h1 className="text-3xl text-white pt-8">Apply for this Job</h1>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 border mt-5 shadow-lg rounded-2xl bg-white"
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Contact Number"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Education
                </label>
                <input
                  type="education"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Education"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="contactNumber"
                >
                  Experience
                </label>
                <input
                  type="tel"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Experience"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="currentCity"
              >
                Where do you live (Current City/Location)?
              </label>
              <select
                id="currentCity"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              >
                <option value="">Please select</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
            <div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Expected Salary
                </label>
                <input
                  type="expectedSalary"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  placeholder="Expected Salary"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="availableStartDate"
              >
                When are you available to start a new role? (Optional)
              </label>
              <input
                type="date"
                id="availableStartDate"
                name="availableStartDate"
                value={formData.availableStartDate}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="summary">
                Please summarise what you're looking for in a couple of
                sentences
              </label>
              <textarea
                id="summary"
                name="summary"
                rows="3"
                value={formData.summary}
                onChange={handleChange}
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="file">
                Please upload your CV and Cover Letter
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-color hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  checked={formData.isSubscribed}
                  onChange={handleChange}
                  className="mr-2"
                />
                Subscribe to updates and never miss a thing. We will send you
                relevant industry news, free resources to help you in your role,
                competitions, prizes, and more!
              </label>
            </div>
            <button
              type="submit"
              className="btn bg-primary-color hover:bg-hover-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplyJob;
