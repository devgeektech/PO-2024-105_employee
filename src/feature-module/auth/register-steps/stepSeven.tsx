import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import DollorIcon from "../../../icons/DollorIcon";
import WarningGreyIcon from "../../../icons/WarningGreyIcon";


const StepSeven = ({ formik, onBackClick }: any) => {

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
                      <span className="backBtn" onClick={onBackClick}>
                        <BackIcon />
                      </span>
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="processWrapper">
                      <ul>
                        <li className="active"></li>
                        <li className="active"></li>
                        <li className="active"></li>
                        <li className="active"></li>
                        <li className="active"></li>
                        <li className="active"></li>
                      </ul>
                    </div>
                    <div className="shadow-card steps">
                      <h2 className="text-center">Tell us your fees</h2>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          <form className="googleLocations" autoComplete="off" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                              <div className="group-img iconLeft iconRight email position-relative">
                                <label><DollorIcon /></label>
                                <input
                                  type="number"
                                  className="commonInput form-control"
                                  placeholder="0"
                                  name="checkinRate"
                                  onChange={(event: any) => formik.setFieldValue("checkinRate", event.target.value)}
                                />
                                <span className="perCheck">| per check-in</span>
                              </div>
                              <p className="mb-0 mt-2 text-start opacity-50"><WarningGreyIcon /> Recommendation: Generally other partners charge between $10 - $15.</p>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                            >
                              Continue
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
                    <div className="h-100 d-flex justify-content-center align-items-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepSeven;
