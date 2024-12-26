import React from "react";
import { publicRoutes, withoutHeaderRoutes } from "./router.link";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../common/header";
import Footer from "../../core/components/footer/page";
// import Footer from "../common/footer";

const AllRoutes = () => {
  const HeaderLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
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
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};
export default AllRoutes;
