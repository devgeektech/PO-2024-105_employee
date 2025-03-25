import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import UserIcon from "../../../icons/UserIcon";
import BusinessIcon from "../../../icons/BusinessIcon";
import EmailIcon from "../../../icons/EmailIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import ErrorText from "../../../core/components/error-text";

const StepThird = ({ formik, submitDetails }: any) => {
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
                      {/* <div className="processWrapper">
                        <ul>
                          <li className="active"></li>
                          <li className="active"></li>
                        </ul>
                      </div> */}

                      <div className="shadow-card">
                        <h2 className="text-center">
                          {/* Please filled the company details */}
                          Vote for your company
                        </h2>
                        <p className="text-center">All fields are mandatory</p>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="user"
                            role="tabpanel"
                            aria-labelledby="user-tab"
                          >
                            {/* Register Form */}
                            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><BusinessIcon /></label>
                                  <input
                                    name="companyName"
                                    id="companyName"
                                    type="text"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Name of the company"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("companyName", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.companyName && formik.touched.companyName} message={formik.errors?.companyName} />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><GlobeIcon /></label>
                                  <input
                                    type="text"
                                    name="companyEmail"
                                    id="companyEmail"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Email of the company (optional)"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("companyEmail", ev.target.value);
                                    }}
                                  />
                                </div>
                                {/* <div className="text-start">
                                  <ErrorText show={formik.errors.companyEmail && formik.touched.companyEmail} message={formik.errors?.companyEmail} />
                                </div> */}
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><EmailIcon /></label>
                                  <input
                                    type="email"
                                    id="contactEmail"
                                    name="contactEmail"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Email of the contact person (optional)"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("contactEmail", ev.target.value);
                                    }}
                                  />
                                </div>
                              </div>

                              <button
                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                type="submit"
                              >
                                Submit
                              </button>

                              {/* <div className="text-center">
                                <Link to={"/auth/login"} className="text-underline">Skip for now</Link>
                              </div> */}
                            </form>
                            {/* /Register Form */}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="coach"
                            role="tabpanel"
                            aria-labelledby="coach-tab"
                          ></div>
                        </div>
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

export default StepThird;
