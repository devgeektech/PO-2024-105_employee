import React, { useState } from 'react'
import { all_routes } from '../router/all_routes'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../core/data/img/ImageWithBasePath';
import BackIcon from '../../icons/BackIcon';

const ConfirmEmail = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  // Access state passed via `navigate`
  const location = useLocation();
  const { email } = location.state || {}; // Use fallback empty object to avoid errors

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  return (
    <div className="main-wrapper authendication-pages">
      <div className="content">
        <div className="container wrapper no-padding">
          <div className="row no-margin vph-100">

            <div className="col-12 col-sm-12  col-lg-4 no-padding">
              <div className="dull-pg">
                <div className="row no-margin vph-100 d-flex align-items-top justify-content-center">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <header className="text-center position-relative">
                      <Link className='backBtn' to={"/auth/login"}><BackIcon /></Link>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="shadow-card">
                      <h2 className="text-center">We recognize you</h2>
                      <p className="text-center">We’ve sent you a password reset link to your email “{email}”. Please check mail and follow the instructions.</p>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          <form >
                            <button
                              type="submit"
                              onClick={handleLoginClick}
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block">
                              Continue to login
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-lg-8 no-padding">
              <div className="banner-bg login">
                <div className="row no-margin h-100">
                  <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                    <div className="h-100 d-flex justify-content-center align-items-center">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ConfirmEmail