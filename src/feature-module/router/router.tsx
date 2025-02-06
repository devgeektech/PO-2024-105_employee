import React from "react";
import { publicRoutes, withoutHeaderRoutes } from "./router.link";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Header from "../common/header";
import Footer from "../../core/components/footer/page";
// import Footer from "../common/footer";

const AllRoutes = () => {
  const location = useLocation();

  console.log(location.pathname,">>> pathname")
  const HeaderLayout = () => (
    <>
      {!location.pathname.includes("/subscription") &&
        !location.pathname.includes("/subscription/details") && <Header />}
      <Outlet />
      {!location.pathname.includes("/subscription") &&
        !location.pathname.includes("/subscription/details") && <Footer />}
      {/* <Loader/> */}
    </>
  );

  return (
    <>
      <Routes>
        <Route path={"/"} element={<HeaderLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route path={"/"}>
          {withoutHeaderRoutes.map((route, idx) => (
            <Route path={route?.path} element={route?.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};
export default AllRoutes;
