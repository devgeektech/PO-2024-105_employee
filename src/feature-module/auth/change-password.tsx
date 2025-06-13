import React, { useState } from "react";
import { all_routes } from "../router/all_routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import BackIcon from "../../icons/BackIcon";
import KeyIcon from "../../icons/KeyIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LANG } from "../../constants/language";
import { createNewPassword } from "../../services/auth.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import http from "../../services/http.service";
import { useDispatch } from "react-redux";
import { setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const route = all_routes;
  const dispatch= useDispatch();

  // Access state passed via `navigate`
  const location = useLocation();
  const { email, onBoarding } = location.state || {}; // Use fallback empty object to avoid errors

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required(LANG.PASSWORD_IS_REQUIRED)
      .min(8, LANG.PASSWORD_MIN_LENGTH)
      .matches(/[A-Z]/, LANG.PASSWORD_UPPERCASE)
      .matches(/[a-z]/, LANG.PASSWORD_LOWERCASE)
      .matches(/[0-9]/, LANG.PASSWORD_NUMBER)
      .matches(/[@#%!-]/, LANG.PASSWORD_SYMBOL),
    confirmPassword: Yup.string()
      .required(LANG.CONFIRM_PASSWORD_IS_REQUIRED)
      .oneOf([Yup.ref("newPassword")], LANG.PASSWORDS_MUST_MATCH),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const payload = { email, password: values.newPassword };
        const result = await createNewPassword(payload);

        if (result.status == 200) {
          // toast.success(LANG.LOGIN_SUCCESSFULLY);
          localStorage.setItem('token', result.data?.data?.token);
          localStorage.setItem('id', result.data?.data?._id);
          dispatch(setLogin(true));
          dispatch(setUserDetail(result.data?.data));
          http.defaults.headers['Authorization'] = result.data?.data?.token;
          navigate(route.Settings);
        }
        else {
          toast.error(LANG.UNEXPECTED_ERROR);
        }
        setSubmitting(false);
      }
      catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.responseMessage || LANG.UNEXPECTED_ERROR);
        }
        setSubmitting(false);
      }
      finally {
        setLoading(false);
      }
    },
  });


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
                      {/* <Link className="backBtn" to={"/auth/login"}>
                        <BackIcon />
                      </Link> */}
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>

                    <div className="shadow-card">
                      <h2 className="text-center">
                        {onBoarding ? "Create your password" : "Set your new password"}
                      </h2>

                      <p className="text-center">
                        Create a password with combine of alphabets, numbers and
                        symbols (@,#,%, !){" "}
                      </p>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                              <div className="pass-group group-img  iconLeft email position-relative">
                                <label>
                                  <KeyIcon />
                                </label>
                                <i
                                  className={`toggle-password ${showPassword ? "feather-eye" : "feather-eye-off"}`}
                                  onClick={togglePasswordVisibility}
                                />
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="newPassword"
                                  value={formik.values.newPassword}
                                  onChange={formik.handleChange}
                                  id="newpassword"
                                  placeholder="Enter your new Password"

                                  className={`form-control pass-confirm ${
                                    formik.touched.newPassword && formik.errors.newPassword
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // className="form-control pass-confirm"
                                />

                                {formik.touched.newPassword && formik.errors.newPassword && (
                                  <div className="invalid-feedback">
                                    {formik.errors.newPassword}
                                  </div>
                                )}

                              </div>
                            </div>

                            <div className="form-group">
                              <div className="pass-group group-img  iconLeft email position-relative">
                                <label>
                                  <KeyIcon />
                                </label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="confirmPassword"
                                  onChange={formik.handleChange}
                                  value={formik.values.confirmPassword}
                                  id="password"
                                  placeholder="Confirm your new Password"
                                  // className="form-control pass-confirm"

                                  className={`form-control pass-confirm ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                      ? "is-invalid"
                                      : ""
                                    }`}
                                />

                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                  <div className="invalid-feedback">
                                    {formik.errors.confirmPassword}
                                  </div>
                                )}
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                              disabled={loading}
                            >
                              {loading ? "Processing..." : onBoarding ? "Create password and go to dashboard" : "Set new Password"}
                            </button>
                          </form>
                          {/* /Login Form */}
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

export default ChangePassword;
