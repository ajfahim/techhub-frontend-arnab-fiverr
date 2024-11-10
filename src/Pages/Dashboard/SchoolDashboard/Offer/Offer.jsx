// src/components/Offer.js
import React, { useEffect, useState } from "react";
import { FaEdit, FaRegCopy } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Navbar from "../../../../Shared/Navbar/Navbar";

function Offer() {
  const { user } = useAuthContext();
  const [offers, setoffers] = useState([]);

  const navigate = useNavigate();

  const fetchOffers = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/offer/getOffers/schoolDashboard/${user?.user?._id}`
    );

    const data = await response.json();

    console.log(":::::", data.length);

    setoffers(data);
  };
  useEffect(() => {
    if (user?.user?._id) {
      fetchOffers();
    }
  }, [user]);

  const handleDelete = async (offerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/offer/deleteOffer/${offerId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the offer");
        }

        fetchOffers();
      } catch (error) {
        console.error("Error deleting the offer:", error);
        alert("There was an error deleting the offer. Please try again.");
      }
    }
  };

  const handleCopy = async (offerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to copy this offer?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/api/offer/copyOffer/${offerId}`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the offer");
        }

        fetchOffers();
      } catch (error) {
        console.error("Error deleting the offer:", error);
        alert("There was an error deleting the offer. Please try again.");
      }
    }
  };

  const handleEdit = (offerId) => {
    navigate("/dashboard/addoffer", { state: { offerId } });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center px-16 bg-white shadow-2xl border-t py-2">
        <IoIosHome className="text-primary-color text-2xl" /> &nbsp; / offer
      </div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28">
        <div className="flex justify-between my-4">
          <h1 className="font-bold text-2xl">Your Offer</h1>
          <Link to="/dashboard/addoffer">
            <button className="bg-primary-color text-white px-4 py-2 rounded hover:bg-hover-color">
              + Add Offer
            </button>
          </Link>
        </div>
        <div className="flex mx-auto flex-wrap">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="max-w-xl min-h-[200px] border rounded-xl p-6 m-4 shadow-lg w-[480px] h-[300px]"
            >
              <div className="flex flex-col justify-around h-full">
                <h2 className="text-xl font-semibold">{offer.title}</h2>
                <h3 className="text-lg">{user?.user?.schoolName}</h3>
                <div
                  className={`my-2 px-2 py-4 rounded font-bold text-center flex gap-4 border-2 w-1/2 shadow-md`}
                >
                  <div
                    className={`h-6 w-6  rounded-full`}
                    style={{
                      backgroundColor:
                        offer.recievedOffers.length === 0 ? "red" : "green",
                    }}
                  ></div>
                  {offer.recievedOffers.length === 0
                    ? "No Applications"
                    : `${offer.recievedOffers.length} Applications`}
                </div>
                <div className="flex justify-start gap-4 mt-4">
                  <button
                    className="bg-primary-color text-white p-3 text-2xl rounded-full hover:bg-hover-color"
                    onClick={() => handleEdit(offer._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-primary-color text-white p-3 text-2xl rounded-full hover:bg-hover-color"
                    onClick={() => handleCopy(offer._id)}
                  >
                    <FaRegCopy />
                  </button>
                  <button
                    className="bg-primary-color text-white p-3 text-2xl rounded-full hover:bg-hover-color"
                    onClick={() => handleDelete(offer._id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offer;
