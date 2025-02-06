import React from "react";
import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import Home from "../home/home";
import ComingSoon from "../pages/coming-soon";
import ContactUs from "../contact-us/contact-us";
import Error404 from "../pages/error-404";
import Events from "../pages/events";
import EventDetails from "../pages/event-details";
import ListingGridSidebar from "../listing/listing-grid-sidebar";
import ListingGrid from "../listing/listing-grid";
import ListingListSidebar from "../listing/listing-list-sidebar";
import ListingMapSidebar from "../listing/listing-map-sidebar";
import ServiceDetail from "../pages/service-detail";
import Services from "../pages/services";
import TermsCondition from "../pages/terms-condition";
import PrivacyPolicy from "../pages/privacy-policy";
import Pricing from "../pages/pricing";
import MyProfile from "../pages/my-profile";
import ListingList from "../listing/listing-list";
import ListingMap from "../listing/listing-map";
import Testimonials from "../pages/testimonials";
import TestimonialsCarousel from "../pages/testimonials-carousel";
import Faq from "../pages/faq";
import ForgotPassword from "../auth/forgot-password";
import Gallery from "../pages/gallery";
import Signin from "../auth/register";
import Login from "../auth/login";
import ChangePassword from "../auth/change-password";
import Maintenance from "../pages/maintenance";
import VerifyAccountPage from "../auth/verify-account";
import SelectRoles from "../auth/select-roles";
import Settings from "../settings/page";
import ValidationRedirect from "../auth/validation-redirect";
import ConfirmEmail from "../auth/confirm-email";
import StepFive from "../auth/register-steps/StepFour";
import StepThird from "../auth/register-steps/StepSecond";
import StepSecond from "../auth/register-steps/stepFirst";
import EditSetting from "../settings/Edit/page";
import SubscriptionSuccess from "../subscription/Cards/page";
import SubscriptionDetails from "../subscription/Details/page";
import ChangePasswordTabContent from "../../core/components/profile-setting/change-password/page";
import Booking from "../booking/page";
import CheckIn from "../check-in/page";
import StepFirst from "../auth/register-steps/stepFirst";
import Subscription from "../subscription/page";
import ThankYou from "../auth/register-steps/thankYou";
import Redirect from "../subscription/Redirect/page";
import StepFour from "../auth/register-steps/StepThird";
import LoginVerification from "../auth/login-verification";

const routes = all_routes;

const publicRoutes = [
  {
    path: routes.home,
    element: <Home />,
    route: Route,
  },
  {
    path: routes.contactUs,
    element: <ContactUs />,
    route: Route,
  },
  {
    path: routes.events,
    element: <Events />,
    route: Route,
  },
  {
    path: routes.eventdetails,
    element: <EventDetails />,
    route: Route,
  },
  {
    path: routes.listingGridSidebar,
    element: <ListingGridSidebar />,
    route: Route,
  },
  {
    path: routes.listingGrid,
    element: <ListingGrid />,
    route: Route,
  },
  {
    path: routes.listingList,
    element: <ListingList />,
    route: Route,
  },
  {
    path: routes.listingListSidebar,
    element: <ListingListSidebar />,
    route: Route,
  },
  {
    path: routes.listingMap,
    element: <ListingMap />,
    route: Route,
  },
  {
    path: routes.listingMapSidebar,
    element: <ListingMapSidebar />,
    route: Route,
  },
  {
    path: routes.Settings,
    element: <Settings />,
    route: Route,
  },
  {
    path: routes.serviceDetail,
    element: <ServiceDetail />,
    route: Route,
  },
  {
    path: routes.services,
    element: <Services />,
    route: Route,
  },
  {
    path: routes.termsCondition,
    element: <TermsCondition />,
    route: Route,
  },
  {
    path: routes.privacyPolicy,
    element: <PrivacyPolicy />,
    route: Route,
  },
  {
    path: routes.pricing,
    element: <Pricing />,
    route: Route,
  },
  {
    path: routes.myProfile,
    element: <MyProfile />,
    route: Route,
  },
  {
    path: routes.testimonials,
    element: <Testimonials />,
    route: Route,
  },
  {
    path: routes.testimonialsCarousel,
    element: <TestimonialsCarousel />,
    route: Route,
  },
  {
    path: routes.faq,
    element: <Faq />,
    route: Route,
  },
 
  {
    path: routes.gallery,
    element: <Gallery />,
    route: Route,
  }, 
  {
    path: "/",
    name: "Root",
    element: <Navigate to="/auth/login" />,
    route: Route,
  },
  {
    path: "*",
    name: "NotFound",
    element: <Navigate to="/index" />,
    route: Route,
  },
  {
    path: routes.profile,
    element: <EditSetting/>,
    route: Route,
  },
  {
    path: routes.settingChangePassword,
    element: <ChangePasswordTabContent/>,
    route: Route,
  },
  {
    path: routes.subscription,
    element: <Subscription/>,
    route: Route,
  },
  {
    path: routes.subscriptionSuccess,
    element: <SubscriptionSuccess/>,
    route: Route,
  },
  {
    path: routes.subscriptionDetails,
    element: <SubscriptionDetails />,
    route: Route
  },
  { path: routes.subscriptionRedirect,
    element: <Redirect />,
    route: Route
  },
  {
    path: routes.booking,
    element: <Booking/>,
    route: Route,
  },
  {
    path: routes.checkIn,
    element: <CheckIn/>,
    route: Route,
  }
];

const withoutHeaderRoutes = [
  {
    path: routes.comingSoon,
    element: <ComingSoon />,
    route: Route,
  },
  {
    path: routes.error404,
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.register,
    element: <Signin />,
    route: Route,
  },
  {
    path: routes.login,
    element: <Login />,
    route: Route,
  },
  {
    path: routes.loginVerification,
    element: <LoginVerification/>,
    route: Route,
  },
  {
    path: routes.verifyAccount,
    element: <VerifyAccountPage />,
    route: Route,
  },
  {
    path: routes.maintenance,
    element: <Maintenance />,
    route: Route,
  },
  {
    path: routes.forgotPasssword,
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: routes.changePassword,
    element: <ChangePassword />,
    route: Route,
  },
  {
    path: routes.confirmEmail,
    element: <ConfirmEmail />,
    route: Route,
  },
  {
    path: routes.selectRole,
    element: <SelectRoles />,
    route: Route,
  },
  {
    path: routes.login_token,
    element: <ValidationRedirect />,
    route: Route,
  },
  // Register steps Routes
  {
    path: routes.stepOne,
    element: <StepFirst />,
    route: Route,
  },
  {
    path: routes.stepTwo,
    element: <StepSecond />,
    route: Route,
  },
  {
    path: routes.stepThree,
    element: <StepThird />,
    route: Route,
  },
  {
    path: routes.stepFour,
    element: <StepFour />,
    route: Route,
  },
  {
    path: routes.stepFive,
    element: <StepFive />,
    route: Route,
  },,
  {
    path: routes.thankYou,
    element: <ThankYou />,
    route: Route,
  },
  
  

];
export { publicRoutes, withoutHeaderRoutes };
