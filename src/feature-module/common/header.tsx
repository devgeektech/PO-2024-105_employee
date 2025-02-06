import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import { setLocations, setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";
import { Dropdown } from "react-bootstrap";
import { clearStorage } from "../../services/storage.service";
import { LANG } from "../../constants/language";
import LogutIcon from "../../icons/LogutIcon";
import { getUserProfile, isLoginUser } from "../../services/user.service";
import { getAllLocations, getLocationById } from "../../services/partner.service";
const Header = () => {
  const routes: any = all_routes;
  const headerRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [authToken, setAuthToken] = useState("");

console.log('headerRef -----------  ',headerRef);

  // const MenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-opened");
      const sidebarOverlay = document.querySelector(".sidebar-overlay");
      if (sidebarOverlay) {
        sidebarOverlay.classList.add("opened");
      }
    } else {
      document.body.classList.remove("menu-opened");
      const sidebarOverlay = document.querySelector(".sidebar-overlay");
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove("opened");
      }
    }

    // Cleanup to remove class if component unmounts
    return () => {
      document.body.classList.remove("menu-opened");
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  const header = [
    {
      tittle: "Subscription",
      showAsTab: false,
      separateRoute: true,
      // routes: routes.subscription,
      routes: `${routes.subscription}?token=${authToken || localStorage.getItem("token")}`,
      hasSubRoute: false,
      showSubRoute: false
    },
  ];

  const customStyle = {
    background: location.pathname.includes(routes.home)
      ? "rgb(23, 124, 130)"
      : "rgba(33, 148, 255, 1)",
    width: "calc(100% - 64px)",
    marginLeft: "32px",
    marginRight: "32px",
    borderRadius: "24px",
  };

  useEffect(() => {
    const isLogged = isLoginUser();
    if (isLogged) {
      dispatch(setLogin(true));
      getUserDetail();
    } else {
      navigate(routes.login);
    }
  }, [])

  const getUserDetail = async () => {
    try {
      const userData = await getUserProfile();
      dispatch(setUserDetail(userData?.data?.data));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className={
          location.pathname.includes(routes.home)
            ? "header header-trans"
            : "header header-sticky"
        }
      // style={customStyle}
      >
        <div className="container-fluid headerInner" style={customStyle}>
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link to="index" className="navbar-brand logo">
                {true ? (
                  <ImageWithBasePath
                    src="assets/img/LogoWhite.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                ) : (
                  <ImageWithBasePath
                    src="assets/img/LogoWhite.svg"
                    className="img-fluid"
                    alt="Another Image"
                  />
                )}
              </Link>
              <button className="toggleMenu menu-open" id="mobile_btn" onClick={toggleMenu}>
                <ImageWithBasePath src="assets/img/megaMenu.png" className="img-fluid" alt="megaMenu Image" />
              </button>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="index" className="menu-logo">
                  <ImageWithBasePath
                    src="assets/img/LogoWhite.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="#" onClick={toggleMenu}>
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                {header.map((mainMenus: any, mainIndex) => (
                  <React.Fragment key={mainIndex}>
                    {mainMenus.separateRoute ? (
                      <li
                        key={mainIndex}
                        className={
                          location.pathname.includes(mainMenus.routes)
                            ? "active"
                            : ""
                        }
                      >
                        <Link to={mainMenus.routes}>{mainMenus.tittle}</Link>
                      </li>
                    ) : (
                      <li
                        className={`has-submenu ${mainMenus?.menu?.map((item: any) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                      >
                        <Link to="#">
                          {mainMenus.tittle}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <>
                  <Dropdown className="loginProfileWrapper">
                    <Dropdown.Toggle className="header-profile-button" id="dropdown-basic">
                      {user?.userDetail?.firstName}
                      <svg className="ms-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.718L17.0513 10.6667L16.1 9.74867L12 13.8487L7.9 9.74867L6.94867 10.6667L12 15.718ZM12.0043 24C10.345 24 8.78489 23.6851 7.324 23.0553C5.86333 22.4256 4.59267 21.5709 3.512 20.4913C2.43133 19.4118 1.57589 18.1422 0.945667 16.6827C0.315222 15.2233 0 13.6639 0 12.0043C0 10.345 0.314889 8.78489 0.944667 7.324C1.57444 5.86333 2.42911 4.59267 3.50867 3.512C4.58822 2.43133 5.85778 1.57589 7.31733 0.945667C8.77667 0.315222 10.3361 0 11.9957 0C13.655 0 15.2151 0.31489 16.676 0.944668C18.1367 1.57445 19.4073 2.42911 20.488 3.50867C21.5687 4.58822 22.4241 5.85778 23.0543 7.31733C23.6848 8.77667 24 10.3361 24 11.9957C24 13.655 23.6851 15.2151 23.0553 16.676C22.4256 18.1367 21.5709 19.4073 20.4913 20.488C19.4118 21.5687 18.1422 22.4241 16.6827 23.0543C15.2233 23.6848 13.6639 24 12.0043 24ZM12 22.6667C14.9778 22.6667 17.5 21.6333 19.5667 19.5667C21.6333 17.5 22.6667 14.9778 22.6667 12C22.6667 9.02222 21.6333 6.5 19.5667 4.43333C17.5 2.36667 14.9778 1.33333 12 1.33333C9.02222 1.33333 6.5 2.36667 4.43333 4.43333C2.36667 6.5 1.33333 9.02222 1.33333 12C1.33333 14.9778 2.36667 17.5 4.43333 19.5667C6.5 21.6333 9.02222 22.6667 12 22.6667Z" fill="#3C3C3C" />
                      </svg>

                    </Dropdown.Toggle>
                    <div className="dropdownWrap">
                      <Dropdown.Menu>
                        <div>
                          <div className="linksWrap">

                            <Dropdown.Item>
                              <Link to={`${all_routes.profile}?token=${authToken || localStorage.getItem("token")}`}>
                                Profile Management
                              </Link>
                            </Dropdown.Item>

                            {/* <Dropdown.Item
                              onClick={() =>
                                navigate(`${all_routes.profile}?token=${authToken || localStorage.getItem("token")}`)
                              }
                            >
                              Profile Management
                            </Dropdown.Item> */}

                          </div>
                          <div className="logoutBtnWrap">
                            <Dropdown.Item onClick={handleLogout}>
                              <LogutIcon /> {LANG.LOGOUT}
                            </Dropdown.Item>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </div>
                  </Dropdown>

                </>
              </li>
            </ul>
          </nav>
          <div className="sidebar-overlay " onClick={toggleMenu}></div>
        </div>
      </header>
    </>
  );
};

export default Header;
