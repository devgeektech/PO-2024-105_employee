import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import UserIcon from "../../../icons/UserIcon";
import ErrorText from "../../../core/components/error-text";
import EmailIcon from "../../../icons/EmailIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import TimerIcon from "../../../icons/TimerIcon";

const StepFive = ({ formik, submitDetails }: any) => {
  useEffect(() => {
    formik.setFieldValue("email", submitDetails.email);
  }, []);


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
                          Add account details
                        </h2>
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
                                  <label><UserIcon /></label>
                                  <input
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Your first name"
                                    onChange={(ev: any) => {
                                      console.log(ev.target.value, "firstName :")
                                      formik.setFieldValue("firstName", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.firstName && formik.touched.firstName} message={formik.errors?.firstName} />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><UserIcon /></label>
                                  <input
                                    name="lastName"
                                    id="lastName"
                                    type="text"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Your last name"
                                    onChange={(ev: any) => {
                                      console.log(ev.target.value, "lastName :")
                                      formik.setFieldValue("lastName", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.lastName && formik.touched.lastName} message={formik.errors?.lastName} />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><EmailIcon /></label>
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Email"
                                    disabled={true}
                                    value={submitDetails?.email}
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><PhoneIcon /></label>
                                  <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="Phone number"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("phone", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.phone && formik.touched.phone} message={formik.errors?.phone} />
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><TimerIcon /></label>
                                  <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    maxLength={2}
                                    className="form-control commonInput"
                                    placeholder="Age"
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("age", ev.target.value);
                                    }}
                                  />
                                </div>
                                <div className="text-start">
                                  <ErrorText show={formik.errors.age && formik.touched.age} message={formik.errors?.age} />
                                </div>
                              </div>

                              <button
                                // disabled={error? true: false}
                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                type="submit"
                              >
                                Continue
                              </button>
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
                      {/* <div className="bottom-text text-center">
                        <p> Already have an account?
                          <Link to={"/auth/login"} className="text-underline">Sign in</Link>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-8 no-padding">
                <div className="banner-bg register">
                  <div className="row no-margin h-100">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <div className="h-100 d-flex justify-content-center align-items-center"></div>
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

export default StepFive;
