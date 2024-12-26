import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import UserIcon from "../../../icons/UserIcon";
import BusinessIcon from "../../../icons/BusinessIcon";
import EmailIcon from "../../../icons/EmailIcon";
import GlobeIcon from "../../../icons/GlobeIcon";
import PhoneIcon from "../../../icons/PhoneIcon";
import ErrorText from "../../../core/components/error-text";

const StepFirstOld = ({formik}:any) => {
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
                            Grow your business with fitpond
                          </h2>
                          <p className="text-center">Apply to join our network for free.</p>
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
                                      <label><UserIcon/></label>
                                      <input
                                        name="name"
                                        id="name"
                                        type="text"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Your name"
                                        onChange={(ev: any) => {
                                            console.log(ev.target.value,"name :")
                                            formik.setFieldValue("name", ev.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="text-start">
                                       <ErrorText show={formik.errors.name && formik.touched.name} message={formik.errors?.name} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><BusinessIcon/></label>
                                      <input
                                        type="text"
                                        name="businessName"
                                        id="businessName"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Business name"
                                        onChange={(ev: any) => {
                                          formik.setFieldValue("businessName", ev.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="text-start">
                                       <ErrorText show={formik.errors.businessName && formik.touched.businessName} message={formik.errors?.businessName} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><EmailIcon/></label>
                                      <input
                                        type="email"
                                        id="email"
                                        name= "email"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Email"
                                        onChange={(ev: any) => {
                                          formik.setFieldValue("email", ev.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="text-start">
                                       <ErrorText show={formik.errors.email && formik.touched.email} message={formik.errors?.email} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><GlobeIcon/></label>
                                      <input
                                        type="text"
                                        name="businessWebsite"
                                        id="businessWebsite"
                                        maxLength={64}
                                        className="form-control commonInput"
                                        placeholder="Business website"
                                        onChange={(ev: any) => {
                                          formik.setFieldValue("businessWebsite", ev.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="text-start">
                                       <ErrorText show={formik.errors.businessWebsite && formik.touched.businessWebsite} message={formik.errors?.businessWebsite} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="group-img iconLeft  position-relative">
                                      <label><PhoneIcon/></label>
                                      <input
                                        type="number"
                                        id="phone"
                                        name= "phone"
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
                        <div className="bottom-text text-center">
                          <p> Already have an account?
                              <Link to={"/auth/login"}  className="text-underline">Sign in</Link>
                           </p>
                         </div>
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

export default StepFirstOld;
