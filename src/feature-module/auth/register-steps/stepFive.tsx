import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import LocationIcon from "../../../icons/LocationIcon";
import CrossIcon from "../../../icons/CrossIcon";
import { Autocomplete } from "@react-google-maps/api";
const StepFive = ({ formik, locations, setLocations, onBackClick }: any) => {
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [city, setCity] = useState<any>("");
  const [zipCode, setZipCode] = useState<any>("");
  const [myBusinessAccount, setMyBusinessAccount] = useState<any>(false);
  const handleLoad = (autoCompleteInstance: any) => {
    setAutocomplete(autoCompleteInstance);
  };

  useEffect(() => {
    //
  }, [setLocations, zipCode, city]);

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    const location = place.geometry?.location;
    const url = place.url;
    let zipCode = "";
    let cityValue = "";
    if (place.address_components) {
      place.address_components.forEach((component: any) => {
        const types = component.types;
        if (types.includes("postal_code")) {
          zipCode = component.long_name;
          setZipCode(zipCode);
        }
        if (types.includes("locality")) {
          cityValue = component.long_name;
          setCity(cityValue);
        }
      });
    }

    if (place.place_id) {
      setMyBusinessAccount(true);
    }

    if (location) {
      let array = [];
      array = locations;
      if (location.lat() && location.lng()) {
        const isDuplicate = array.some((loc: any) => loc.address === place.formatted_address);

        if (!isDuplicate) {
          array.push({
            lat: location.lat(),
            lng: location.lng(),
            address: place.formatted_address,
            url,
            hasBusinessAccount: myBusinessAccount,
          });
          setLocations(array);
        }
      }
    }
  };

  const deleteLocation = (indexToRemove: number) => {
    setLocations((prevLocations: any[]) =>
      prevLocations.filter((_, index) => index !== indexToRemove)
    );
  };

  const addMoreLocations = () => {
    setAddress("");
    setZipCode("");
    setCity("");
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
                        <li className="active"></li>
                        <li className="active"></li>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="shadow-card steps">
                      <h2 className="text-center">
                        Tell us about your location
                      </h2>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          <form
                            className="googleLocations"
                            onSubmit={formik.handleSubmit}
                          >
                            <div className="form-group">
                              {locations.map((item: any, index: any) => (
                                <div key={index} className="addressSelect">
                                  <label className="mb-3 w-100">
                                    Address {index + 1}{" "}
                                    <button
                                      type="button"
                                      onClick={() => deleteLocation(index)}
                                    >
                                      <CrossIcon />
                                    </button>
                                  </label>
                                  <Link
                                    to={"#"}
                                    target="_blank"
                                    className="underline"
                                  >
                                    {item.address}
                                  </Link>
                                </div>
                              ))}
                            </div>
                            <div className="form-group">
                              <label className="mb-3 w-100">Address </label>
                              <div className="group-img iconLeft email position-relative">
                                <label>
                                  <LocationIcon />
                                </label>
                                <Autocomplete
                                  onLoad={handleLoad}
                                  onPlaceChanged={handlePlaceChanged}
                                >
                                  <input
                                    type="text"
                                    name="search"
                                    className="commonInput form-control"
                                    placeholder="Search for a place"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </Autocomplete>
                              </div>
                            </div>
                            <div className="from-group">
                              <div className="d-flex gap-3">
                                <input
                                  type="text"
                                  name="zipCode"
                                  className="commonInput form-control"
                                  placeholder="Zip code"
                                  onChange={(v) => setZipCode(v.target.value)}
                                  value={zipCode}
                                />
                                <input
                                  type="text"
                                  name="city"
                                  className="commonInput form-control"
                                  placeholder="City"
                                  value={city}
                                  onChange={(v) => setCity(v.target.value)}
                                />
                              </div>
                            </div>

                            <div className="form-group d-flex justify-content-end mt-2">
                              <p className="mb-0">
                                You have more than 1 location?
                                <button
                                  onClick={addMoreLocations}
                                  className="addEvent"
                                  type="button"
                                >
                                  + Add more location
                                </button>
                              </p>
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

export default StepFive;
