import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import SearchIcon from "../../../icons/SearchIcon";
import { getServicelist } from "../../../services/services.service";

const StepSix = ({ formik , setServices, onBackClick}: any) => {
  const [servicelist, setServicelist] = useState<any[]>([]);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const result = await getServicelist();
      setServicelist(result?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Checkbox Changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedServices = checked
      ? [...(formik.values.services || []), value]
      : (formik.values.services || []).filter((id: string) => id !== value);

    formik.setFieldValue("services", updatedServices);
    setServices(updatedServices); 
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
                        <li className="active"></li>
                        <li></li>
                      </ul>
                    </div>
                    <div className="shadow-card steps">
                      <h2 className="text-center">Select your services</h2>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          <form className="googleLocations" autoComplete="off" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                              <div className="group-img iconLeft email position-relative">
                                <label><SearchIcon /></label>
                                <input type="text" className="commonInput form-control" placeholder="Search service" />
                              </div>
                            </div>

                            <div className="services-list">
                              {servicelist?.map((item: any, index: number) => (

                                <label className="service-item" key={index} >
                                  <input
                                    type="checkbox"
                                    name="service"
                                    value={item._id}
                                    checked={(formik.values.services || []).includes(item._id)}
                                    onChange={handleCheckboxChange}
                                  />
                                  {item.name}
                                </label>

                              ))}
                            </div>

                            {formik.errors.services && formik.touched.services && (
                              <div className="error">
                                {formik.errors.services}
                              </div>
                            )}

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

export default StepSix;
