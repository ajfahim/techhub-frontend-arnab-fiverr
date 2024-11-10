import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";

function AddOffer() {
  // State variables for each form field

  const location = useLocation();

  const offerId = location.state?.offerId;

  console.log("const location = useLocation();", offerId);

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [establishment, setEstablishment] = useState("Digital School");
  const [acceptedContract, setAcceptedContract] = useState("Full-Time");
  const [permanentContract, setPermanentContract] = useState("Yes");
  const [interventionType, setInterventionType] = useState("Lecture");
  const [interventionLanguage, setInterventionLanguage] = useState("English");
  const [learnerLevel, setLearnerLevel] = useState("Beginner");
  const [learnerNumber, setLearnerNumber] = useState(10);
  const [diploma, setDiploma] = useState("");
  const [minDegree, setMinDegree] = useState("Bachelor");
  const [presentation, setPresentation] = useState("");
  const [teachingArea, setTeachingArea] = useState("Digital School");
  const [eduObjective, setEduObjective] = useState("");
  const [interventionContent, setInterventionContent] = useState("");
  const [syllabus, setSyllabus] = useState(null); // For file uploads
  const [evaluation, setEvaluation] = useState(false);
  const [speakerPresence, setSpeakerPresence] = useState(false);
  const [faceToFace, setFaceToFace] = useState(false);
  const [remotely, setRemotely] = useState(false);
  const [applicationLimit, setApplicationLimit] = useState(false);
  const [date, setDate] = useState("");
  const [urgentOffer, setUrgentOffer] = useState(false);
  const [flexibleStartDate, setFlexibleStartDate] = useState(false);
  const [flexibleEndDate, setFlexibleEndDate] = useState(false);
  const [defineSlots, setDefineSlots] = useState(false);
  const [totalHours, setTotalHours] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyPay, setHourlyPay] = useState(false);
  const [dailyRate, setDailyRate] = useState(false);
  const [expenses, setExpenses] = useState(false);
  const [identification, setIdentification] = useState(false);
  const [diplomasCertificates, setDiplomasCertificates] = useState(false);
  const [criminalRecord, setCriminalRecord] = useState(false);
  const [cv, setCv] = useState(false);
  const [bankAccount, setBankAccount] = useState(false);
  const [kbis, setKbis] = useState(false);
  const [logistical, setLogistical] = useState("");
  const [keywords, setKeywords] = useState(["Mobile Dev"]);
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [currentSection, setCurrentSection] = useState(1);

  const fetchOfferDetails = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/offer/jobs/${offerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch offer details");
      }
      const data = await response.json();

      // Fill the states with the fetched data
      setTitle(data.title || "");
      setOwner(data.owner || "");
      setDeadline(data.deadline || "");
      setSalary(data.salary || "");
      setEstablishment(data.establishment || "Digital School");
      setAcceptedContract(data.acceptedContract || "Full-Time");
      setPermanentContract(data.permanentContract || "Yes");
      setInterventionType(data.interventionType || "Lecture");
      setInterventionLanguage(data.interventionLanguage || "English");
      setLearnerLevel(data.learnerLevel || "Beginner");
      setLearnerNumber(data.learnerNumber || 10);
      setDiploma(data.diploma || "");
      setMinDegree(data.minDegree || "Bachelor");
      setPresentation(data.presentation || "");
      setTeachingArea(data.teachingArea || "Digital School");
      setEduObjective(data.eduObjective || "");
      setInterventionContent(data.interventionContent || "");
      setSyllabus(data.syllabus || null);
      setEvaluation(data.evaluation || false);
      setSpeakerPresence(data.speakerPresence || false);
      setFaceToFace(data.faceToFace || false);
      setRemotely(data.remotely || false);
      setApplicationLimit(data.applicationLimit || false);
      setDate(data.date || "");
      setUrgentOffer(data.urgentOffer || false);
      setFlexibleStartDate(data.flexibleStartDate || false);
      setFlexibleEndDate(data.flexibleEndDate || false);
      setDefineSlots(data.defineSlots || false);
      setTotalHours(data.totalHours || 10);
      setHoursPerWeek(data.hoursPerWeek || 10);
      setHourlyPay(data.hourlyPay || false);
      setDailyRate(data.dailyRate || false);
      setExpenses(data.expenses || false);
      setIdentification(data.identification || false);
      setDiplomasCertificates(data.diplomasCertificates || false);
      setCriminalRecord(data.criminalRecord || false);
      setCv(data.cv || false);
      setBankAccount(data.bankAccount || false);
      setKbis(data.kbis || false);
      setLogistical(data.logistical || "");
      setKeywords(data.keywords || ["Mobile Dev"]);
      setTags(data.tags || "");
      setVisibility(data.visibility || "private");
      setCurrentSection(data.currentSection || 1);
    } catch (error) {
      console.error("Error fetching offer details:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useState(() => {
    if (offerId) {
      fetchOfferDetails();
    }
  }, [offerId]);

  const handleAdd = () => {
    if (tags.trim() !== "") {
      setKeywords([...keywords, tags.trim()]);
      setTags("");
    }
  };

  const handleRemove = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "evaluation":
        setEvaluation(checked);
        break;
      case "speakerPresence":
        setSpeakerPresence(checked);
        break;
      case "faceToFace":
        setFaceToFace(checked);
        break;
      case "remotely":
        setRemotely(checked);
        break;
      case "applicationLimit":
        setApplicationLimit(checked);
        break;
      case "urgentOffer":
        setUrgentOffer(checked);
        break;
      case "flexibleStartDate":
        setFlexibleStartDate(checked);
        break;
      case "flexibleEndDate":
        setFlexibleEndDate(checked);
        break;
      case "defineSlots":
        setDefineSlots(checked);
        break;
      case "hourlyPay":
        setHourlyPay(checked);
        break;
      case "dailyRate":
        setDailyRate(checked);
        break;
      case "expenses":
        setExpenses(checked);
        break;
      case "identification":
        setIdentification(checked);
        break;
      case "diplomasCertificates":
        setDiplomasCertificates(checked);
        break;
      case "criminalRecord":
        setCriminalRecord(checked);
        break;
      case "cv":
        setCv(checked);
        break;
      case "bankAccount":
        setBankAccount(checked);
        break;
      case "kbis":
        setKbis(checked);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();

    // Create the offer object with all form data
    const offerData = {
      title,
      school: user?.user?._id,
      owner,
      deadline,
      salary,
      establishment,
      acceptedContract,
      permanentContract,
      interventionType,
      interventionLanguage,
      learnerLevel,
      learnerNumber,
      diploma,
      minDegree,
      presentation,
      teachingArea,
      keywords, // tags stored as an array
      eduObjective,
      interventionContent,
      syllabus, // Handle file uploads separately if needed
      evaluation,
      speakerPresence,
      faceToFace,
      remotely,
      applicationLimit,
      date,
      urgentOffer,
      flexibleStartDate,
      flexibleEndDate,
      defineSlots,
      totalHours,
      hoursPerWeek,
      hourlyPay,
      dailyRate,
      expenses,
      identification,
      diplomasCertificates,
      criminalRecord,
      cv,
      bankAccount,
      kbis,
      logistical,
      visibility,
    };

    if (offerId) {
      // Sending the data as JSON to the backend
      fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/api/offer/updateOffer/${offerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Offer created:", data);
        })
        .catch((error) => {
          console.error("Error creating offer:", error);
        });

      navigate("/dashboard/offer");
    } else {
      // Sending the data as JSON to the backend
      fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/offer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Offer created:", data);
        })
        .catch((error) => {
          console.error("Error creating offer:", error);
        });

      navigate("/dashboard/offer");
    }
  };

  return (
    <form
      onSubmit={handleCreateOffer}
      className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-28"
    >
      {currentSection === 1 && (
        <div>
          {/* Section 1: Basic Information */}
          <div className="flex bg-white shadow-xl flex-col lg:flex-row justify-between mb-10 border-l-2 border-primary-color px-8 py-8">
            <div className="flex lg:text-4xl items-center">
              <h1 className="text-primary-color">
                Hello {user?.user?.firstname},
              </h1>
            </div>
            <div className="flex lg:text-4xl items-center">
              <h1 className="mr-1">{user?.user?.schoolName}</h1>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary-color mb-3">
              The Basic
            </h1>
            <p>
              Please fill the form below to become a teacher or student or any
              thing else we can type here
            </p>
          </div>
          <div className="bg-white shadow-xl p-4 rounded-lg">
            <div className="mt-10">
              <h1 className="text-xl font-bold">Your offer</h1>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Offer Title
                    </span>
                  </div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Web trainer"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Establishment concerned
                    </span>
                  </div>
                  <select
                    name="establishment"
                    className="select input-bordered"
                    value={establishment}
                    onChange={(e) => setEstablishment(e.target.value)}
                  >
                    <option value="Digital School">Digital School</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Offer Owner
                    </span>
                  </div>
                  <input
                    type="text"
                    name="owner"
                    placeholder="Jean luce"
                    className="input input-bordered w-full"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Type of contract accepted
                    </span>
                  </div>
                  <select
                    name="acceptedContract"
                    className="select input-bordered"
                    value={acceptedContract}
                    onChange={(e) => setAcceptedContract(e.target.value)}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Type of permanent contract
                    </span>
                  </div>
                  <select
                    name="permanentContract"
                    className="select input-bordered"
                    value={permanentContract}
                    onChange={(e) => setPermanentContract(e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Salary Package
                    </span>
                  </div>
                  <input
                    type="text"
                    name="salary"
                    placeholder="Example: 50,000 - 100,000"
                    className="input input-bordered w-full"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </label>
              </div>
            </div>
            {/* Characteristics */}
            <div className="mt-16">
              <h1 className="text-xl font-bold">Characteristics</h1>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Type of intervention
                    </span>
                  </div>
                  <select
                    name="interventionType"
                    className="select input-bordered"
                    value={interventionType}
                    onChange={(e) => setInterventionType(e.target.value)}
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Language of the intervention
                    </span>
                  </div>
                  <select
                    name="interventionLanguage"
                    className="select input-bordered"
                    value={interventionLanguage}
                    onChange={(e) => setInterventionLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </select>
                </label>
              </div>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Level of learners
                    </span>
                  </div>
                  <select
                    name="learnerLevel"
                    className="select input-bordered"
                    value={learnerLevel}
                    onChange={(e) => setLearnerLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Diploma prepared
                    </span>
                  </div>
                  <input
                    type="text"
                    name="diploma"
                    placeholder="But"
                    className="input input-bordered w-full"
                    value={diploma}
                    onChange={(e) => setDiploma(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Number of learners
                    </span>
                  </div>
                  <input
                    type="number"
                    name="learnerNumber"
                    placeholder="10"
                    className="input input-bordered w-full"
                    value={learnerNumber}
                    onChange={(e) => setLearnerNumber(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Minimum degree level to apply
                    </span>
                  </div>
                  <select
                    name="minDegree"
                    className="select input-bordered"
                    value={minDegree}
                    onChange={(e) => setMinDegree(e.target.value)}
                  >
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                  </select>
                </label>
              </div>
            </div>
            {/* Institution */}
            <div>
              <h1>Your institution</h1>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">Presentation</span>
                </div>
                <textarea
                  name="presentation"
                  placeholder="Bio"
                  className="textarea textarea-bordered textarea-lg w-full"
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                ></textarea>
              </label>
            </div>
            {/* Content Offer */}
            <div className="mt-16">
              <h1 className="text-3xl text-primary-color text-center font-bold mb-7">
                Content of your offer
              </h1>
              <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Teaching Subject
                    </span>
                  </div>
                  <select
                    name="teachingArea"
                    className="select input-bordered"
                    value={teachingArea}
                    onChange={(e) => setTeachingArea(e.target.value)}
                  >
                    <option value="Digital School">Digital School</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold">
                      Teaching Level
                    </span>
                  </div>
                  <select
                    name="learnerLevel"
                    className="select input-bordered"
                    value={learnerLevel}
                    onChange={(e) => setLearnerLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </label>
              </div>
            </div>
            {/* Keyword */}
            <div className="my-12">
              <h1 className="font-bold text-xl my-5">Keyword</h1>
              <div className="shadow-2xl p-4 bg-white rounded-xl">
                <div className="flex flex-wrap mb-4">
                  {keywords.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-teal-800 mr-2 mb-2 px-3 py-1 rounded-full flex items-center"
                    >
                      {tag}
                      <p
                        onClick={() => handleRemove(index)}
                        className="ml-2 cursor-pointer text-red-600 hover:text-red-800"
                      >
                        ×
                      </p>
                    </span>
                  ))}
                </div>
                <div className="flex items-center bg-teal-50 p-2 rounded-lg">
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Keywords"
                    className="flex-grow p-2 rounded-lg outline-none"
                  />
                  <p
                    onClick={handleAdd}
                    className="ml-2 cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                  >
                    Add
                  </p>
                </div>
              </div>
            </div>
            {/* Educational objective */}
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Educational objectives
                  </span>
                </div>
                <textarea
                  name="eduObjective"
                  className="textarea textarea-bordered textarea-lg w-full"
                  value={eduObjective}
                  onChange={(e) => setEduObjective(e.target.value)}
                ></textarea>
              </label>
            </div>
            {/* Content of the intervention */}
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Content of the intervention
                  </span>
                </div>
                <textarea
                  name="interventionContent"
                  className="textarea textarea-bordered textarea-lg w-full"
                  value={interventionContent}
                  onChange={(e) => setInterventionContent(e.target.value)}
                ></textarea>
              </label>
            </div>

            <div className="mt-12">
              <label className="font-bold text-xl">Syllabus</label>
              <div className="border mt-4 rounded-lg">
                <p className="p-4">
                  To complete your offer, you can upload its syllabus - PDF only
                </p>
                <div className="border flex justify-end bg-primary-color bg-opacity-60 text-right px-4 py-2">
                  <input
                    type="file"
                    name="syllabus"
                    accept="application/pdf"
                    id="fileupload"
                    className="file-input file-input-ghost border rounded-full mr-3"
                    onChange={(e) => setSyllabus(e.target.files[0])}
                    aria-labelledby="fileupload-label"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h1 className="font-bold text-xl my-6">Evaluation</h1>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="evaluation"
                  className="toggle toggle-success"
                  checked={evaluation}
                  onChange={handleChange}
                />
                <span>Evaluation to proceed</span>
              </div>
            </div>
            <div className="mx-auto text-center">
              <p
                className="btn cursor-pointer bg-primary-color text-white mt-6 text-center mx-auto rounded-full px-8"
                onClick={handleNext}
              >
                Next
              </p>
            </div>
          </div>
        </div>
      )}

      {currentSection === 2 && (
        <div>
          {/* Section 2: Logistics */}
          <div className="text-center mt-6">
            <h1 className="text-5xl font-bold text-primary-color mb-3">
              Logistics
            </h1>
          </div>
          <div className="bg-white shadow-lg rounded-md px-4 pb-12">
            <h1 className="text-2xl text-center my-6 text-primary-color font-semibold">
              Logistics
            </h1>
            <h1 className="font-bold text-xl">Presentation</h1>
            {/* presentation */}
            <div className=" border p-4 my-6  bg-white  rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="faceToFace"
                      name="faceToFace"
                      checked={faceToFace}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="faceToFace">Face to Face</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remotely"
                      name="remotely"
                      checked={remotely}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="remotely">Remotely</label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="school" className="block mb-2">
                    School
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <p className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded">
                  502
                </p>
              </div>
            </div>
            {/* Dates */}
            <div>
              <h1 className="text-xl font-bold my-4">Dates</h1>
              <div className="  p-4 border bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="date" className="block mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4 ">
                  <input
                    type="checkbox"
                    name="urgentOffer"
                    className="toggle toggle-success mr-1"
                    checked={urgentOffer}
                    onChange={handleChange}
                  />

                  <label htmlFor="urgentOffer" className="mr-2">
                    Urgent offer
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="flexibleStartDate"
                      className="toggle toggle-success mr-1"
                      checked={flexibleStartDate}
                      onChange={handleChange}
                    />
                    <label htmlFor="flexibleStartDate" className="mr-2">
                      Flexible start date
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="flexibleEndDate"
                      className="toggle toggle-success mr-1"
                      checked={flexibleEndDate}
                      onChange={handleChange}
                    />
                    <label htmlFor="flexibleEndDate" className="mr-2">
                      Flexible end date
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="defineSlots"
                      className="toggle toggle-success mr-1"
                      checked={defineSlots}
                      onChange={handleChange}
                    />
                    <label htmlFor="defineSlots" className="mr-2">
                      Define Slots
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="timeSlots"
                      className="toggle toggle-success mr-1"
                    />
                    <label htmlFor="timeSlots" className="block mb-2">
                      Time Slots
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="setDaysOfWeek"
                      className="toggle toggle-success mr-1"
                    />
                    <label htmlFor="setDaysOfWeek" className="mr-2">
                      Set Days of week
                    </label>
                  </div>
                  <div>
                    <label htmlFor="daysOfWeek" className="block mb-2">
                      Days of the week
                    </label>
                    <select
                      id="daysOfWeek"
                      name="daysOfWeek"
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="mt-12 mb-2 font-bold text-2xl">Hourly Volume</h1>
            <div className="p-4 border  bg-white shadow-md rounded-lg  mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {/* Minimum Hours Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Hours
                  </label>
                  <div className=" input input-bordered mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="totalHours"
                      className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 border-gray-300 rounded-l-md sm:text-sm"
                      value={totalHours}
                      onChange={(e) => setTotalHours(e.target.value)}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md  border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Hours
                    </span>
                  </div>
                </div>

                {/* Maximum Hours Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Hours
                  </label>
                  <div className="input input-bordered mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="hoursPerWeek"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 border-gray-300 rounded-l-md sm:text-sm"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md  border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Remuneration and expenses */}
            <h1 className="font-bold font-xl mt-12 mb-3">
              Remuneration and expenses
            </h1>
            <div className="p-4 border bg-white shadow-md rounded-lg mx-auto">
              <div className="space-y-4">
                {/* Hourly Pay Option */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hourlyPay"
                      checked={hourlyPay}
                      onChange={handleChange}
                      className="toggle toggle-success"
                    />
                    <span className="text-gray-700">Hourly pay</span>
                  </label>
                </div>

                {/* Daily Rate Option */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="dailyRate"
                      checked={dailyRate}
                      onChange={handleChange}
                      className="toggle toggle-success"
                    />
                    <span className="text-gray-700">
                      Remuneration at the daily rate
                    </span>
                  </label>
                </div>

                {/* Expenses Option */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="expenses"
                      checked={expenses}
                      onChange={handleChange}
                      className="toggle toggle-success"
                    />
                    <span className="text-gray-700">Expenses</span>
                  </label>
                </div>
              </div>
            </div>

            {/*  */}
            <h1 className="mt-12 mb-2 font-bold text-xl">
              Administrative file
            </h1>
            <div className="p-4 border mx-auto bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                Specify the documents required for the stakeholder's
                administrative file:
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="identification"
                    checked={identification}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>Identification</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="diplomasCertificates"
                    checked={diplomasCertificates}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>Diplomas and certifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="criminalRecord"
                    checked={criminalRecord}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>
                    Extract from the criminal record (less than 3 months)
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="cv"
                    checked={cv}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>CV</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="bankAccount"
                    checked={bankAccount}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>Bank account details</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="kbis"
                    checked={kbis}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5"
                  />
                  <span>KBIS (less than 3 months)</span>
                </label>
              </div>
            </div>
            {/*  */}
            <h1 className="mt-12 mb-2 font-bold text-xl">Logistical details</h1>
            <div className=" mx-auto">
              <textarea
                name="logistical"
                placeholder="Specify the documents required for the stakeholder's administrative file."
                className="textarea textarea-bordered textarea-lg w-full"
                type="text"
                id="logistical"
                value={logistical}
                onChange={(e) => setLogistical(e.target.value)}
              ></textarea>
            </div>
            {/*  */}
            <div className="mb-4  ">
              <h1 className=" text-primary-color font-semibold mb-2 text-center text-5xl  my-12">
                Status of your offer
              </h1>
              <div className="flex gap-5 justify-center items-center mt-12">
                <div className="relative inline-block">
                  <select
                    id="visibility"
                    name="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="block appearance-none text-white bg-primary-color border   py-3 px-4 pr-8  leading-tight focus:outline-none hover:bg-hover-color rounded-full"
                  >
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="LinkOnly">Link Only</option>
                  </select>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your job doesn't appear in search results and can't receive
                  applications.
                </p>
              </div>
            </div>

            <div className="mt-8 border mx-auto bg-white shadow-md rounded p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded border flex gap-7 items-center">
                  <h2 className="font-semibold text-2xl text-primary-color">
                    LinkedIn Share
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your offer must be in "public" or "link only" status to use
                    this feature.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded border flex gap-7 items-center">
                  <h2 className="font-semibold  text-2xl text-primary-color">
                    Internal sharing
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your offer must be in "public" or "link only" status to use
                    this feature.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded border flex gap-7 items-center">
                  <h2 className="font-semibold  text-2xl text-primary-color">
                    Tenors Broadcast
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your offer must be in "public" or "link only" status to use
                    this feature.
                  </p>
                </div>
                <div className="mx-auto text-center">
                  <p
                    className="btn cursor-pointer bg-primary-color text-white mt-6 text-center mx-auto rounded-full px-8"
                    onClick={handlePrev}
                  >
                    Previous
                  </p>
                  <button
                    className="btn bg-primary-color text-white mt-6 text-center mx-auto rounded-full px-8"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddOffer;
