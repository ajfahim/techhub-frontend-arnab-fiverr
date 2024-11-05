import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home/Home";
import Account from "../Pages/Account/Account";
import Profile from "../Pages/Profile/Profile";

import SchoolDashboard from './../Pages/Dashboard/SchoolDashboard/SchoolDahsboard/SchoolDashboard';
import Offer from "../Pages/Dashboard/SchoolDashboard/Offer/Offer";
import ViewEstablishment from "../Pages/Dashboard/SchoolDashboard/ViewEstablishment/ViewEstablishment";
import AddEstablish from "../Pages/Dashboard/SchoolDashboard/AddEstablish/AddEstablish";
import Activity from "../Pages/Dashboard/SchoolDashboard/Activity/Activity";
import AllEstablishment from "../Pages/Dashboard/SchoolDashboard/AllEstablishment/AllEstablishment";
import AddOffer from "../Pages/Dashboard/SchoolDashboard/AddOffer/AddOffer";
import ContactUs from "../Pages/ContactUs/ContactUs";
import FAQ from "../Pages/FAQ/FAQ";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Speakers from "../Pages/Dashboard/SchoolDashboard/Speakers/Speakers";
import ApplicationReceived from "../Pages/Dashboard/SchoolDashboard/ApplicationReceived/ApplicationReceived";
import TeacherDashboard from "../Pages/Dashboard/TeacherDashboard/TeacherDashboard/TeacherDashboard";
import Opportunities from "../Pages/Dashboard/TeacherDashboard/Opportunities/Opportunities";
import ApplyJob from "../Pages/Dashboard/TeacherDashboard/ApplyJob/ApplyJob";
import SingleJobView from "../Pages/Dashboard/TeacherDashboard/SingleJobView/SingleJobView";
import TeacherDashboardActivity from "../Pages/Dashboard/TeacherDashboard/TeacherDashboardActivity/TeacherDashboardActivity";
import RoleDecide from "../Pages/RoleDecide/RoleDecide";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard/AdminDashboard";
import Offers from "../Pages/Dashboard/AdminDashboard/Offers/Offers";
import ViewEstablish from "../Pages/Dashboard/TeacherDashboard/ViewEstablish/ViewEstablish";
import MyApplications from "../Pages/Dashboard/TeacherDashboard/MyApplications/MyApplications";
import Message from "../Components/Message/MessageApp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/roledecide",
        element: <RoleDecide />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/account",
        element: <Account></Account>,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
    ],
  },
  // School Dashboard Route
  {
    path: "/dashboard",
    element: <SchoolDashboard></SchoolDashboard>,
    children: [
      {
        path: "/dashboard",
        element: <Activity></Activity>,
      },

      {
        path: "/dashboard/offer",
        element: <Offer></Offer>,
      },

      {
        path: "/dashboard/addestablish",
        element: <AddEstablish></AddEstablish>,
      },
      {
        path: "/dashboard/viewestablishment",
        element: <ViewEstablishment></ViewEstablishment>,
      },
      {
        path: "/dashboard/addoffer",
        element: <AddOffer></AddOffer>,
      },
      {
        path: "/dashboard/speakers",
        element: <Speakers></Speakers>,
      },
      {
        path: "/dashboard/applicationreceived",
        element: <ApplicationReceived></ApplicationReceived>,
      },
    ],
  },
  // Teacher Dashboard Route
  {
    path: "/teacherDashboard",
    element: <TeacherDashboard></TeacherDashboard>,
    children: [
      {
        path: "/teacherDashboard/opportunities",
        element: <Opportunities></Opportunities>,
      },
      {
        path: "/teacherDashboard/applyJob/:id",
        element: <ApplyJob></ApplyJob>,
      },
      {
        path: "/teacherDashboard/singleJobview/:id",
        element: <SingleJobView></SingleJobView>,
      },
      {
        path: "/teacherDashboard",
        element: <TeacherDashboardActivity></TeacherDashboardActivity>,
      },
      {
        path: "/teacherDashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/teacherDashboard/allestablishment",
        element: <AllEstablishment></AllEstablishment>,
      },
      {
        path: "/teacherDashboard/allestablishment/:id",
        element: <ViewEstablish />,
      },
      {
        path: "/teacherDashboard/application",
        element: <MyApplications />,
      },
    ],
  },

  // Admin Dashboard Route
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "/adminDashboard/offers",
        element: <Offers />,
      },
    ],
  },
]);
