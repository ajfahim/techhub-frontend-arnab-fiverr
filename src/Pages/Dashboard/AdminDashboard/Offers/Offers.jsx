import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import ButtonGroup from "../../../../Components/ButtonGroup/ButtonGroup";
import Navbar from "../../../../Shared/Navbar/Navbar";

const Offers = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [filteredJobDetails, setFilteredJobDetails] = useState([]);

  const fetchOffers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/offer/getOffers`
      );
      const data = await response.json();
      setJobDetails(data);
      setFilteredJobDetails(data); // Set filteredJobDetails initially to all data
      console.log("offers", data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSearch = (inputs) => {
    const filtered = jobDetails.filter((jobDetail) =>
      Object.keys(inputs).every((key) =>
        inputs[key]
          ? jobDetail[key]?.toLowerCase().includes(inputs[key].toLowerCase())
          : true
      )
    );
    setFilteredJobDetails(filtered); // Update the filteredJobDetails state with the filtered data
  };

  const handleEdit = () => {
    // Handle edit logic will be implemented by Arnab Da.
  };

  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with the deletion
        fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/offer/deleteOffer/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "The job offer has been deleted.", "success");
            fetchOffers(); // Re-fetch the offers to update the list after deletion
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was an error deleting the job offer.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto px-4 md:px-20 lg:px-28 max-w-[1440px]">
        <ButtonGroup
          labels={["Name", "User Type", "Job Post"]}
          onSearch={handleSearch}
        />

        {/* Tables */}
        <div className="mt-6">
          <h1 className="text-2xl font-semibold my-4">Job Details</h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="font-bold">Sl no.</th>
                  <th className="font-bold">Job Title</th>
                  <th className="font-bold">ID No</th>
                  <th className="font-bold">Posting Date</th>
                  <th className="font-bold">Posted By</th>
                  <th className="font-bold">
                    Application <br /> Received
                  </th>
                  <th className="font-bold">Deadline</th>
                  <th className="font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic Row Creation */}
                {filteredJobDetails.map((job, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{job.title}</td>
                    <td>{job.id}</td>
                    <td>{job.postingDate}</td>
                    <td>{job.owner}</td>
                    <td>{job.applicationsReceived}</td>
                    <td>{job.deadline}</td>
                    <td className="flex gap-3">
                      <FaEdit
                        onClick={handleEdit}
                        className="text-2xl cursor-pointer"
                      />
                      <RiDeleteBinLine
                        onClick={() => handleDelete(job?._id)}
                        className="text-2xl cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Offers;
