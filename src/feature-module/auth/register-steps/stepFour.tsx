import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import LocationIcon from "../../../icons/LocationIcon";
import { Autocomplete } from "@react-google-maps/api";
const StepFour = ({ formik, isVerifiedBussiness, setIsVerifiedBussiness, onBackClick, onSkipNow }: any) => {

  const [autocomplete, setAutocomplete] = useState<any>(null);

  const handleLoad = (autoCompleteInstance: any) => {
    setAutocomplete(autoCompleteInstance);
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.place_id) {
        setIsVerifiedBussiness(true)
      }
    }
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
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="shadow-card steps">
                      <h2 className="text-center">Link your google business with us</h2>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form className="googleLocations" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                              <div className="group-img iconLeft email position-relative">
                                <label><LocationIcon /></label>
                                <Autocomplete
                                  onLoad={handleLoad}
                                  onPlaceChanged={handlePlaceChanged}
                                >
                                  <input
                                    type="text"
                                    name="search"
                                    className="commonInput form-control"
                                    placeholder="Search for a place"
                                  />

                                </Autocomplete>
                              </div>
                            </div>
                            {/* <div className="form-group d-flex justify-content-end">
                              <p className="mb-0">You have more than 1 location?<button className="addEvent" type="button">+ Add more location</button></p>
                            </div> */}

                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                            >
                              Continue
                            </button>
                            <div className="text-center">
                              <Link className="underline" onClick={onSkipNow} to={""}>Skip for now</Link>
                            </div>
                          </form>
                          {/* /Login Form */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center">Not on Google yet?<Link className="underline" to={"#"}>Add your profile now</Link></p>
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

export default StepFour;
