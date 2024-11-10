import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CiShoppingTag } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
  const { user } = useAuthContext();
  console.log("🚀 ~ Profile ~ user:", user?.user?._id);

  const [currentUser, setCurrentUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    availableDate: [],
    availableInWeek: [],
    availableInDay: [],
    minWeeklyHours: 0,
    maxWeeklyHours: 0,
    timeOfDay: "",
    timeOfRange: "",
    workPreference: "",
    selectCity: "",
    otherLocation: "",
    subjectGradeLevel: "",
    teachingExperience: 0,
    skills: [],
    newSkill: "",
    notes: "",
    companyName: "",
    companyType: "",
    chargePermission: false,
    professionalCareer: "",
    studentPlan: "",
    interestedBy: [],
    permanentContract: false,
    motivations: [],
    publicSpeaking: false,
    secondarySchoolCourses: false,
    higherEducationCourses: false,
    establishment: "",
    higherEducationConference: false,
    companyTraining: false,
    corporateConference: false,
    bts: false,
    modules: "",
    privateLessons: false,
    diplomas: [],
    certifications: [],
    languages: [],
    computerLanguages: "",
    establishmentGroups: [],
  });

  const [editingField, setEditingField] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const fetchCurrentUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getUser/${
        user?.user?._id
      }`
    );
    const data = await response.json();
    console.log("current user", data);
    setCurrentUser(data);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const gotPage1 = () => {
    setActiveTab(1);
    scrollToTop();
  };

  const gotpage2 = () => {
    setActiveTab(2);
    scrollToTop();
  };

  const gotpage3 = () => {
    setActiveTab(3);
    scrollToTop();
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchCurrentUser();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = () => {
    if (currentUser.newSkill) {
      setCurrentUser((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill],
        newSkill: "",
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCurrentUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddDiploma = () => {
    if (currentUser.newDiploma) {
      setCurrentUser((prev) => ({
        ...prev,
        diplomas: [...prev.diplomas, prev.newDiploma],
        newDiploma: "",
      }));
    }
  };

  const handleAddCertification = () => {
    if (currentUser.newCertification) {
      setCurrentUser((prev) => ({
        ...prev,
        certifications: [...prev.certifications, prev.newCertification],
        newCertification: "",
      }));
    }
  };

  const handleAddEstablishment = () => {
    if (currentUser.newGroup) {
      setCurrentUser((prev) => ({
        ...prev,
        establishmentGroups: [...prev.establishmentGroups, prev.newGroup],
        newGroup: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/updateUser/${
          user?.user?._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );
      const data = await response.json();
      console.log("Profile updated:", data);
      gotPage1();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      className={`${activeTab === 1 && "pb-[2500px]"} ${
        activeTab === 2 && "pb-[1300px]"
      } ${activeTab === 3 && "pb-[2700px]"} mb-10`}
    >
      <div className="bg-[#2f9995] p-5 h-52">
        <div className="flex justify-between">
          <button className="bg-white py-2 px-4 rounded-2xl">
            Change my cover
          </button>
          <div>
            <button className="bg-white py-2 px-4 rounded-2xl mr-3">
              See my profile
            </button>
            <button className="bg-white py-2 px-4 rounded-2xl">
              Share my profile
            </button>
          </div>
        </div>
        <div className="w-3/4 mx-auto">
          <div className="flex justify-between items-center pt-20">
            <div className="flex gap-5">
              <div className="avatar">
                <div className="w-32 rounded-full border-4 border-white">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div>
                <h3 className="text-white text-3xl font-semibold pb-3 pt-6">
                  {currentUser.firstname} {currentUser.lastname}
                </h3>
                <p>Big business</p>
              </div>
            </div>
            <select
              className="bg-white py-2 px-4 rounded-2xl mb-16"
              name=""
              id=""
            >
              <option value="1st">Link Only</option>
              <option value="1st">1st</option>
              <option value="1st">1st</option>
              <option value="1st">1st</option>
            </select>
          </div>
          <div className="text-right">
            <button className="text-white bg-[#2f9995] py-1 px-3 rounded-2xl">
              Edit your resume
            </button>
          </div>
          {activeTab === 1 && (
            <div>
              <div className="border rounded-md p-5 mt-2 mb-2">
                <h3 className="text-3xl">Personal Information (Optional)</h3>
                <div className="pt-4">
                  <p>First Name</p>
                  <input
                    type="text"
                    name="firstname"
                    value={currentUser.firstname}
                    onChange={handleInputChange}
                    className="rounded-2xl border p-1 mt-2 w-1/3"
                  />
                </div>
                <div className="pt-4">
                  <p>Last Name</p>
                  <input
                    type="text"
                    name="lastname"
                    value={currentUser.lastname}
                    onChange={handleInputChange}
                    className="rounded-2xl border p-1 mt-2 w-1/3"
                  />
                </div>
                <div className="pt-4">
                  <p>Email</p>
                  <input
                    type="text"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    className="rounded-2xl border p-1 mt-2 w-1/3"
                  />
                </div>
                <div className="pt-4">
                  <p>Phone Number</p>
                  <input
                    type="text"
                    name="phone"
                    value={currentUser.phone}
                    onChange={handleInputChange}
                    className="rounded-2xl border p-1 mt-2 w-1/3"
                  />
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Availability Calendar</h5>
                <div>
                  <Calendar
                    onChange={(date) =>
                      setCurrentUser((prev) => ({
                        ...prev,
                        availableDate: date + 1,
                      }))
                    }
                    value={currentUser.availableDate}
                    name="availableDate"
                  />
                </div>
                <div className="flex gap-10 pt-5">
                  <div>
                    <h5 className="text-xl pb-3">Days of week</h5>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <div key={day}>
                        <input
                          className="mr-2 border border-[#2f9995]"
                          type="checkbox"
                          name="availableInWeek"
                          value={day}
                          checked={currentUser.availableInWeek.includes(day)}
                          onChange={(e) => {
                            const newAvailableInWeek =
                              currentUser.availableInWeek.includes(day)
                                ? currentUser.availableInWeek.filter(
                                    (d) => d !== day
                                  )
                                : [...currentUser.availableInWeek, day];
                            setCurrentUser((prev) => ({
                              ...prev,
                              availableInWeek: newAvailableInWeek,
                            }));
                          }}
                        />
                        <span>{day}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h5 className="text-xl pb-3">Times of the Day Available</h5>
                    {["Morning", "Afternoon", "Evening"].map((time) => (
                      <div key={time}>
                        <input
                          className="mr-2 border border-[#2f9995]"
                          type="checkbox"
                          name="availableInDay"
                          value={time}
                          checked={currentUser.availableInDay.includes(time)}
                          onChange={(e) => {
                            const newAvailableInDay =
                              currentUser.availableInDay.includes(time)
                                ? currentUser.availableInDay.filter(
                                    (t) => t !== time
                                  )
                                : [...currentUser.availableInDay, time];
                            setCurrentUser((prev) => ({
                              ...prev,
                              availableInDay: newAvailableInDay,
                            }));
                          }}
                        />
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Hours per Week</h5>
                <div className="flex justify-between items-center">
                  <div className="w-1/2 mr-4">
                    <p className="block mb-1">Maximum weekly hours</p>
                    <div className="">{currentUser.maxWeeklyHours}</div>
                    <input
                      type="range"
                      name="maxWeeklyHours"
                      min="0"
                      max="10"
                      value={currentUser.maxWeeklyHours}
                      onChange={handleInputChange}
                      className="slider cursor-pointer"
                    />
                  </div>
                  <div className="w-1/2 ml-4">
                    <p className="block mb-1">Minimum weekly hours</p>
                    <div className="">{currentUser.minWeeklyHours}</div>
                    <input
                      type="range"
                      name="minWeeklyHours"
                      min="0"
                      max="10"
                      value={currentUser.minWeeklyHours}
                      onChange={handleInputChange}
                      className="slider cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Time of Day (Optional)</h5>
                <div className="flex gap-5 items-end">
                  <select
                    name="timeOfDay"
                    value={currentUser.timeOfDay}
                    onChange={handleInputChange}
                    className="border rounded-2xl py-1 px-3 mt-2 mr-5 cursor-pointer"
                  >
                    <option className="cursor-pointer" value="">
                      Select an option
                    </option>
                    <option className="cursor-pointer" value="Morning">
                      Morning
                    </option>
                    <option className="cursor-pointer" value="Afternoon">
                      Afternoon
                    </option>
                    <option className="cursor-pointer" value="Evening">
                      Evening
                    </option>
                  </select>
                  <div>
                    <p>Time Range</p>
                    <input
                      type="text"
                      name="timeOfRange"
                      value={currentUser.timeOfRange}
                      onChange={handleInputChange}
                      className="border rounded-2xl py-1 px-3 mt-2 mr-5"
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <div>
                  <h5 className="text-xl pb-3">Work Preference</h5>
                  <div>
                    <input
                      className="mr-2 border border-[#2f9995]"
                      type="radio"
                      name="workPreference"
                      value="In-person"
                      checked={currentUser.workPreference === "In-person"}
                      onChange={handleInputChange}
                    />
                    <span>In-person</span>
                  </div>
                  <div>
                    <input
                      className="mr-2 border border-[#2f9995]"
                      type="radio"
                      name="workPreference"
                      value="Remote"
                      checked={currentUser.workPreference === "Remote"}
                      onChange={handleInputChange}
                    />
                    <span>Remote</span>
                  </div>
                  <div>
                    <input
                      className="mr-2 border border-[#2f9995]"
                      type="radio"
                      name="workPreference"
                      value="Both"
                      checked={currentUser.workPreference === "Both"}
                      onChange={handleInputChange}
                    />
                    <span>Both</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Location (If In-Person)</h5>
                <div className="flex gap-5 items-end">
                  <select
                    name="selectCity"
                    value={currentUser.selectCity}
                    onChange={handleInputChange}
                    className="border rounded-2xl py-1 px-3 mt-2 mr-5 cursor-pointer"
                  >
                    <option className="cursor-pointer" value="">
                      Select a city
                    </option>
                    <option className="cursor-pointer" value="New York">
                      New York
                    </option>
                    <option className="cursor-pointer" value="San Francisco">
                      San Francisco
                    </option>
                    <option className="cursor-pointer" value="Chicago">
                      Chicago
                    </option>
                  </select>
                  <div>
                    <p>Other</p>
                    <input
                      type="text"
                      name="otherLocation"
                      value={currentUser.otherLocation}
                      onChange={handleInputChange}
                      className="border rounded-2xl py-1 px-3 mt-2 mr-5"
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Additional Information</h5>
                <div className="flex gap-5 items-end">
                  <div>
                    <p>Subjects/Grade Levels Taught</p>
                    <select
                      name="subjectGradeLevel"
                      value={currentUser.subjectGradeLevel}
                      onChange={handleInputChange}
                      className="border rounded-2xl py-1 px-3 mt-2 mr-5 cursor-pointer"
                    >
                      <option className="cursor-pointer" value="">
                        Select a level
                      </option>
                      <option className="cursor-pointer" value="High School">
                        High School
                      </option>
                      <option className="cursor-pointer" value="Undergraduate">
                        Undergraduate
                      </option>
                      <option className="cursor-pointer" value="Graduate">
                        Graduate
                      </option>
                    </select>
                  </div>
                  <div>
                    <p>Teaching Experience (Years)</p>
                    <input
                      type="number"
                      name="teachingExperience"
                      value={currentUser.teachingExperience}
                      onChange={handleInputChange}
                      className="border rounded-2xl py-1 px-3 mt-2"
                    />
                  </div>
                </div>
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <h5 className="text-xl pb-3 m-5">Skills/Qualifications</h5>
                {currentUser.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#2f9995] m-5 flex items-center gap-5 rounded-2xl px-3 py-1 w-fit cursor-pointer"
                  >
                    <p className="text-white">{skill}</p>
                    <RxCross2 onClick={() => handleRemoveSkill(skill)} />
                  </div>
                ))}
                <div className="bg-[#2f9995] rounded-b-md p-6 mt-10 flex gap-5 justify-end">
                  <label className="input input-bordered flex items-center gap-2 w-1/3">
                    <CiShoppingTag className="text-xl" />
                    <input
                      type="text"
                      name="newSkill"
                      value={currentUser.newSkill}
                      onChange={handleInputChange}
                      className="grow"
                      placeholder="Keywords"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-white text-[#2f9995] cursor-pointer px-6 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="text-white bg-[#2f9995] py-2 mt-5 cursor-pointer px-6 rounded-md"
                  onClick={gotpage2}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl">Additional Notes</h5>
                <textarea
                  className="w-full border rounded-2xl mt-3 h-28"
                  name="notes"
                  value={currentUser.notes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h3 className="text-xl">My Current Company</h3>
                <p>or latest</p>
                <div className="pt-5">
                  <p>Company Name</p>
                  <input
                    type="text"
                    name="companyName"
                    value={currentUser.companyName}
                    onChange={handleInputChange}
                    className="border w-full rounded-2xl py-1 px-3 mt-2"
                  />
                </div>
                <div className="py-5">
                  <p>What type of company do you work for?</p>
                  <input
                    type="text"
                    name="companyType"
                    value={currentUser.companyType}
                    onChange={handleInputChange}
                    className="border w-full rounded-2xl py-1 px-3 mt-2"
                  />
                </div>
                <div>
                  <input
                    className="mr-2 border border-[#2f9995]"
                    type="checkbox"
                    name="chargePermission"
                    checked={currentUser.chargePermission}
                    onChange={handleInputChange}
                  />
                  <span>I or my company can charge for services</span>
                </div>
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <div className="">
                  <div className="p-5 pb-0">
                    <h5 className="text-xl pb-2">Professional Career</h5>
                    <p>30 Characters minimum</p>
                  </div>
                  {editingField !== "professionalCareer" ? (
                    <>
                      <p className="text-justify pt-8 pl-5">
                        {currentUser.professionalCareer}
                      </p>
                      <div className="bg-[#2f9995] rounded-b-md p-6 mt-10 flex gap-5 justify-end">
                        <button
                          className="bg-white text-[#2f9995] px-6 py-2 rounded-md"
                          onClick={() => setEditingField("professionalCareer")}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <textarea
                        className="w-full border rounded-2xl mt-3 h-28"
                        name="professionalCareer"
                        value={currentUser.professionalCareer}
                        onChange={handleInputChange}
                      />
                      <div className="text-right">
                        <button
                          className="bg-white text-[#2f9995] px-6 py-2 rounded-md"
                          onClick={() => setEditingField(null)}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <div className="">
                  <div className="p-5 pb-0">
                    <h5 className="text-xl pb-1">Your Added Value</h5>
                    <p>What do you plan to bring to students?</p>
                  </div>
                  {editingField !== "studentPlan" ? (
                    <>
                      <p className="text-justify pt-8 pl-5">
                        {currentUser.studentPlan}
                      </p>
                      <div className="bg-[#2f9995] rounded-b-md p-6 mt-10 flex gap-5 justify-end">
                        <button
                          className="bg-white text-[#2f9995] px-6 py-2 rounded-md"
                          onClick={() => setEditingField("studentPlan")}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <textarea
                        className="w-full border rounded-2xl mt-3 h-28"
                        name="studentPlan"
                        value={currentUser.studentPlan}
                        onChange={handleInputChange}
                      />
                      <div className="text-right">
                        <button
                          className="bg-white text-[#2f9995] px-6 py-2 rounded-md"
                          onClick={() => setEditingField(null)}
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button
                  className="text-white bg-[#2f9995] py-2 mt-5 cursor-pointer px-6 rounded-md mr-5"
                  onClick={gotPage1}
                >
                  Previous
                </button>
                <button
                  className="text-white bg-[#2f9995] py-2 mt-5 cursor-pointer px-6 rounded-md"
                  onClick={gotpage3}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">You are Interested in</h5>
                <div className="flex gap-10 pt-5">
                  <div>
                    {[
                      "Courses",
                      "Career Advice",
                      "TP",
                      "Educational Engineering",
                    ].map((interest) => (
                      <div key={interest}>
                        <input
                          className="mr-2 border border-[#2f9995]"
                          type="checkbox"
                          name="interestedBy"
                          value={interest}
                          checked={currentUser.interestedBy.includes(interest)}
                          onChange={(e) => {
                            const newInterestedBy =
                              currentUser.interestedBy.includes(interest)
                                ? currentUser.interestedBy.filter(
                                    (i) => i !== interest
                                  )
                                : [...currentUser.interestedBy, interest];
                            setCurrentUser((prev) => ({
                              ...prev,
                              interestedBy: newInterestedBy,
                            }));
                          }}
                        />
                        <span>{interest}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {["Conferences", "Juries", "TD", "Other"].map(
                      (interest) => (
                        <div key={interest}>
                          <input
                            className="mr-2 border border-[#2f9995]"
                            type="checkbox"
                            name="interestedBy"
                            value={interest}
                            checked={currentUser.interestedBy.includes(
                              interest
                            )}
                            onChange={(e) => {
                              const newInterestedBy =
                                currentUser.interestedBy.includes(interest)
                                  ? currentUser.interestedBy.filter(
                                      (i) => i !== interest
                                    )
                                  : [...currentUser.interestedBy, interest];
                              setCurrentUser((prev) => ({
                                ...prev,
                                interestedBy: newInterestedBy,
                              }));
                            }}
                          />
                          <span>{interest}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl">Permanent Contract Offers</h5>
                <div className="flex gap-5 pt-3">
                  <input
                    type="checkbox"
                    name="permanentContract"
                    className="toggle"
                    checked={currentUser.permanentContract}
                    onChange={handleInputChange}
                  />
                  <p>Open to permanent employment offers in education</p>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">Vos motivations</h5>
                <div className="flex gap-10 pt-5">
                  <div>
                    {[
                      "Pass on my knowledge",
                      "Additional Income",
                      "Old School",
                      "Business Promotion",
                    ].map((motivation) => (
                      <div key={motivation}>
                        <input
                          className="mr-2 border border-[#2f9995]"
                          type="checkbox"
                          name="motivations"
                          value={motivation}
                          checked={currentUser.motivations.includes(motivation)}
                          onChange={(e) => {
                            const newMotivations =
                              currentUser.motivations.includes(motivation)
                                ? currentUser.motivations.filter(
                                    (m) => m !== motivation
                                  )
                                : [...currentUser.motivations, motivation];
                            setCurrentUser((prev) => ({
                              ...prev,
                              motivations: newMotivations,
                            }));
                          }}
                        />
                        <span>{motivation}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {[
                      "Spotting Talent",
                      "Research",
                      "Mentorship",
                      "Innovation",
                    ].map((motivation) => (
                      <div key={motivation}>
                        <input
                          className="mr-2 border border-[#2f9995]"
                          type="checkbox"
                          name="motivations"
                          value={motivation}
                          checked={currentUser.motivations.includes(motivation)}
                          onChange={(e) => {
                            const newMotivations =
                              currentUser.motivations.includes(motivation)
                                ? currentUser.motivations.filter(
                                    (m) => m !== motivation
                                  )
                                : [...currentUser.motivations, motivation];
                            setCurrentUser((prev) => ({
                              ...prev,
                              motivations: newMotivations,
                            }));
                          }}
                        />
                        <span>{motivation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl">Educational Experiences</h5>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="publicSpeaking"
                    checked={currentUser.publicSpeaking}
                    onChange={handleInputChange}
                  />
                  <p>A good experience of public speaking</p>
                </div>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="secondarySchoolCourses"
                    checked={currentUser.secondarySchoolCourses}
                    onChange={handleInputChange}
                  />
                  <p>Courses in secondary school</p>
                </div>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="higherEducationCourses"
                    checked={currentUser.higherEducationCourses}
                    onChange={handleInputChange}
                  />
                  <p>Courses in higher education</p>
                </div>
                <input
                  type="text"
                  name="establishment"
                  value={currentUser.establishment}
                  onChange={handleInputChange}
                  placeholder="For which establishments?"
                  className="border rounded-2xl py-1 px-3 my-2 mr-5 w-full"
                />
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="higherEducationConference"
                    checked={currentUser.higherEducationConference}
                    onChange={handleInputChange}
                  />
                  <p>Conferences in higher education</p>
                </div>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="companyTraining"
                    checked={currentUser.companyTraining}
                    onChange={handleInputChange}
                  />
                  <p>In-company training</p>
                </div>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="corporateConference"
                    checked={currentUser.corporateConference}
                    onChange={handleInputChange}
                  />
                  <p>Corporate conferences</p>
                </div>
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="bts"
                    checked={currentUser.bts}
                    onChange={handleInputChange}
                  />
                  <p>BTS courses</p>
                </div>
                <input
                  type="text"
                  name="modules"
                  value={currentUser.modules}
                  onChange={handleInputChange}
                  placeholder="Initials and name of the modules you have mastered"
                  className="border rounded-2xl py-1 px-3 my-2 mr-5 w-full"
                />
                <div className="flex gap-5 py-3">
                  <input
                    type="checkbox"
                    className="toggle"
                    name="privateLessons"
                    checked={currentUser.privateLessons}
                    onChange={handleInputChange}
                  />
                  <p>Private Lessons</p>
                </div>
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <div className="m-5">
                  <h5 className="text-xl pb-1">Diplomas</h5>
                </div>
                <div className="flex">
                  {currentUser.diplomas.map((diploma, index) => (
                    <div
                      key={index}
                      className="bg-[#2f9995] m-5 flex items-center gap-5 rounded-2xl px-3 py-1 w-fit cursor-pointer"
                    >
                      <p className="text-white">{diploma}</p>
                      <RxCross2
                        onClick={() => {
                          const updatedDiplomas = currentUser.diplomas.filter(
                            (_, i) => i !== index
                          );
                          setCurrentUser((prev) => ({
                            ...prev,
                            diplomas: updatedDiplomas,
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-[#2f9995] rounded-b-md p-3 mt-10 flex items-center gap-5 justify-end">
                  <input
                    className="border rounded-2xl py-1 px-3 my-2 mr-5 w-1/4"
                    placeholder="Diploma Title"
                    name="newDiploma"
                    type="text"
                    defaultValue={currentUser.newSkill}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-white text-[#2f9995] px-6 py-2 rounded-md mr-2"
                    onClick={handleAddDiploma}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <div className="m-5">
                  <h5 className="text-xl pb-1">Certifications</h5>
                </div>
                <div className="flex">
                  {currentUser.certifications.map((certification, index) => (
                    <div
                      key={index}
                      className="bg-[#2f9995] m-5 flex items-center gap-5 rounded-2xl px-3 py-1 w-fit cursor-pointer"
                    >
                      <p className="text-white">{certification}</p>
                      <RxCross2
                        onClick={() => {
                          const updatedCertifications =
                            currentUser.certifications.filter(
                              (_, i) => i !== index
                            );
                          setCurrentUser((prev) => ({
                            ...prev,
                            certifications: updatedCertifications,
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-[#2f9995] rounded-b-md p-3 mt-10 flex items-center gap-5 justify-end">
                  <input
                    className="border rounded-2xl py-1 px-3 my-2 mr-5 w-1/4"
                    placeholder="Certification"
                    name="newCertification"
                    type="text"
                    defaultValue={currentUser.newSkill}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-white text-[#2f9995] px-6 py-2 rounded-md mr-2"
                    onClick={handleAddCertification}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl pb-3">
                  Languages mastered to intervene
                </h5>
                <div className="flex gap-10 pt-5">
                  <div>
                    {["French", "Spanish", "Italian", "Chinese (Mandarin)"].map(
                      (language) => (
                        <div key={language}>
                          <input
                            className="mr-2 border border-[#2f9995]"
                            type="checkbox"
                            name="languages"
                            value={language}
                            checked={currentUser.languages.includes(language)}
                            onChange={(e) => {
                              const newLanguages =
                                currentUser.languages.includes(language)
                                  ? currentUser.languages.filter(
                                      (lang) => lang !== language
                                    )
                                  : [...currentUser.languages, language];
                              setCurrentUser((prev) => ({
                                ...prev,
                                languages: newLanguages,
                              }));
                            }}
                          />
                          <span>{language}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    {["English", "German", "Arabic", "Russian"].map(
                      (language) => (
                        <div key={language}>
                          <input
                            className="mr-2 border border-[#2f9995]"
                            type="checkbox"
                            name="languages"
                            value={language}
                            checked={currentUser.languages.includes(language)}
                            onChange={(e) => {
                              const newLanguages =
                                currentUser.languages.includes(language)
                                  ? currentUser.languages.filter(
                                      (lang) => lang !== language
                                    )
                                  : [...currentUser.languages, language];
                              setCurrentUser((prev) => ({
                                ...prev,
                                languages: newLanguages,
                              }));
                            }}
                          />
                          <span>{language}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-5 mt-7 mb-2">
                <h5 className="text-xl">Software and computer languages</h5>
                <textarea
                  className="w-full border rounded-2xl mt-3 h-28"
                  name="computerLanguages"
                  value={currentUser.computerLanguages}
                  onChange={handleInputChange}
                />
              </div>
              <div className="border rounded-md mt-7 mb-2">
                <div className="m-5">
                  <h5 className="text-xl pb-1">My establishment groups</h5>
                  <p>You are referenced in these groups</p>
                </div>
                {currentUser.establishmentGroups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-[#2f9995] m-5 flex items-center gap-5 rounded-2xl px-3 py-1 w-fit cursor-pointer"
                  >
                    <p className="text-white">{group}</p>
                    <RxCross2
                      onClick={() => {
                        const updatedGroups =
                          currentUser.establishmentGroups.filter(
                            (_, i) => i !== index
                          );
                        setCurrentUser((prev) => ({
                          ...prev,
                          establishmentGroups: updatedGroups,
                        }));
                      }}
                    />
                  </div>
                ))}
                <div className="bg-[#2f9995] rounded-b-md p-3 mt-10 flex items-center gap-5 justify-end">
                  <input
                    className="border rounded-2xl py-1 px-3 my-2 mr-5 w-1/4"
                    placeholder="Reference code"
                    name="newGroup"
                    type="text"
                    defaultValue={currentUser.newSkill}
                    onChange={handleInputChange}
                  />
                  <button
                    className="bg-white text-[#2f9995] px-6 py-2 rounded-md mr-2"
                    onClick={handleAddEstablishment}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="bg-[#2f9995] mr-5 text-white px-6 py-2 rounded-md mt-7"
                  onClick={gotpage2}
                >
                  Previous
                </button>
                <button
                  className="bg-[#2f9995] text-white px-6 py-2 rounded-md mt-7"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
