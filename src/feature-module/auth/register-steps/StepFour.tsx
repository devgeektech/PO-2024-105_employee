import React, { useEffect } from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import UserIcon from "../../../icons/UserIcon";
import ErrorText from "../../../core/components/error-text";
import PhoneIcon from "../../../icons/PhoneIcon";
import CalendarIcon from "../../../icons/CalendarIcon";
import "../style.scss"

const StepFour = ({ formik, submitDetails }: any) => {
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
                          Please complete your personal details
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
                                  <label><UserIcon /></label>
                                  <input
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    maxLength={64}
                                    className="form-control commonInput"
                                    placeholder="First name"
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
                                    placeholder="Last name"
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

                              {/* <div className="form-group">
                                <div className="group-img iconLeft  position-relative">
                                  <label><CalendarIcon /></label>
                                  <input
                                    type="date"
                                    id="date"
                                    name="dob"
                                    className="form-control commonInput"
                                    placeholder="Date of birth (optional)"
                                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split("T")[0]} // Max date is 16 years ago
                                    onKeyDown={(e) => e.preventDefault()} // Prevent typing
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("dob", ev.target.value);
                                    }}
                                  />
                                </div>
                              </div> */}

                              <div className="form-group position-relative">
                                <div className="group-img iconLeft position-relative">
                                  <label><CalendarIcon /></label>
                                  <input
                                    type="date"
                                    id="date"
                                    name="dob"
                                    className="form-control commonInput custom-date-input"
                                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 16))
                                      .toISOString()
                                      .split("T")[0]}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(ev: any) => {
                                      formik.setFieldValue("dob", ev.target.value);
                                    }}
                                    value={formik.values.dob}
                                  />
                                  {!formik.values.dob && (
                                    <span className="custom-date-placeholder">Optional: Date of Birth</span>
                                  )}
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
                        <p> Already have an account? {" "}
                          <Link to={"/auth/login"} className="text-underline">Sign in</Link>
                        </p>
                      </div> */}
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
                          <img src="/assets/img/authOne.png" className="img-fluid w-100 h-100" alt="authOne" />
                        </div>
                        <div className="col-md-6  h50">
                          <img src="/assets/img/authTwo.png" className="img-fluid  w-100 h-100" alt="authTwo" />
                        </div>
                        <div className="col-md-6  h50">
                          <img src="/assets/img/authThree.png" className="img-fluid w-100 h-100" alt="authOne" />
                        </div>
                        <div className="col-md-6  h50">
                          <img src="/assets/img/authFour.png" className="img-fluid  w-100 h-100" alt="authTwo" />
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

export default StepFour;
