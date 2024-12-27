import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { loginUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";
import http from "../../services/http.service";
import { LANG } from "../../constants/language";
import ErrorText from "../../core/components/error-text";
import EmailIcon from "../../icons/EmailIcon";

const loginSchema = Yup.object().shape({
  email: Yup.string().email(LANG.PLEASE_ADD_VALID_EMAIL).required(LANG.EMAIL_IS_REQUIRED),
});

const initialValues = {
  email: "",
};

const Login = () => {
  const route = all_routes;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const result = await loginUser(values);

        if (result.status == 200) {
          toast.success(LANG.LOGIN_SUCCESSFULLY);
          localStorage.setItem('token', result.data?.data?.token);
          localStorage.setItem('id', result.data?.data?._id);

          dispatch(setLogin(true));
          dispatch(setUserDetail({userDetail: result.data?.data}));
          http.defaults.headers['Authorization'] = result.data?.data?.token;
          navigate(route.subscription);

        } else if (result.status == 404) {
          console.log(values)
        }
        setSubmitting(false);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.responseMessage)
        }
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });


  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper authendication-pages">
        {/* Page Content */}
        <div className="content">
          <div className="container wrapper no-padding">
            <div className="row no-margin vph-100">

              <div className="col-12 col-sm-12  col-lg-4 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <header className="text-center">
                        <ImageWithBasePath
                          src="assets/img/logo.png"
                          className="img-fluid"
                          alt="Logo"
                        />
                      </header>

                      <div className="shadow-card">
                        <h2 className="text-center">Enter your email </h2>
                        <p className="text-center">It’s the one you used to sign up for fitpond.</p>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="user"
                            role="tabpanel"
                            aria-labelledby="user-tab"
                          >
                            {/* Login Form */}
                            <form onSubmit={formik.handleSubmit} >
                              <div className="form-group">
                                <div className="group-img iconLeft email position-relative">
                                  <label><EmailIcon /></label>
                                  <input
                                    type="text"
                                    placeholder="Email"
                                    {...formik.getFieldProps("email")}
                                    className={clsx(
                                      "form-control commonInput bg-transparent",
                                      { "border border-danger": formik.touched.email && formik.errors.email },
                                    )}
                                  />
                                </div>
                                <ErrorText show={formik.touched.email && formik.errors.email} message={formik.errors?.email} />
                              </div>

                              <button
                                type="submit"
                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                              >
                                Continue
                              </button>
                            </form>
                            {/* /Login Form */}
                          </div>
                        </div>
                      </div>

                      <div className="bottom-text text-center">
                        <p>
                          Didn't have an account?
                          <Link to={route.register} className="text-underline">Sign up</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-lg-8 no-padding">
                <div className="banner-bg login">
                  <div className="row no-margin h-100">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <div className="h-100 d-flex justify-content-center align-items-center">

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
      {/* /Main Wrapper */}
    </>
  );
};

export default Login;
