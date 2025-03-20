import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import EmailIcon from "../../../icons/EmailIcon";
import ErrorText from "../../../core/components/error-text";

const StepFirst = ({ formik, makeReferral }: any) => {

  return (
    <>
      <div className="main-wrapper authendication-pages">
        {/* Page Content */}
        <div className="content">
          <div className="container wrapper no-padding">
            <div className="row no-margin vph-100">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto mb-2">
                      <header className="text-center">
                        <ImageWithBasePath
                          src="assets/img/logo.png"
                          className="img-fluid"
                          alt="Logo"
                        />
                      </header>

                      <div className="shadow-card">
                        <h2 className="text-center">
                          Enter your work email
                        </h2>
                        <p className="text-center">We'll only use this info to confirm your company added you to their FitPond program.</p>

                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="user"
                            role="tabpanel"
                            aria-labelledby="user-tab"
                          >
                            <form autoComplete="off" onSubmit={formik.handleSubmit}>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><EmailIcon /></label>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Your work email"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("email", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.email && formik.touched.email} message={formik.errors?.email} />
                                </div>
                              </div>

                            <p className="text-center referralLink">Not partnered with Fitpond?{" "}
                              <Link className="text-underline" onClick={makeReferral} to={""}> Make a referral</Link>
                            </p>

                              <button
                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                type="submit"
                              >
                                Continue
                              </button>
                            </form>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="coach"
                            role="tabpanel"
                            aria-labelledby="coach-tab"
                          ></div>
                        </div>
                      </div>

                      <div className="bottom-text text-center">
                        <p> Already have an account? {" "}
                          <Link to={"/auth/login"} className="text-underline">Sign in</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 no-padding">
                <div className="banner-bg register">
                  <div className="row no-margin h100">
                    <div className="col-sm-10 col-md-10 col-lg-12">
                      {/* <div className="h-100 d-flex justify-content-center align-items-center"></div> */}
                        <div className="row h-100">
                          <div className="col-md-6 h50">
                            <img src="/assets/img/authOne.png" className="img-fluid w-100 h-100" alt="authOne"/>
                          </div>
                          <div className="col-md-6  h50">
                            <img src="/assets/img/authTwo.png" className="img-fluid  w-100 h-100" alt="authTwo"/>
                          </div>
                          <div className="col-md-6  h50">
                            <img src="/assets/img/authThree.png" className="img-fluid w-100 h-100" alt="authOne"/>
                          </div>
                          <div className="col-md-6  h50">
                            <img src="/assets/img/authFour.png" className="img-fluid  w-100 h-100" alt="authTwo"/>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default StepFirst;
