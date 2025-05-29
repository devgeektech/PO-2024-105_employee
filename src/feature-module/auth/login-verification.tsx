import React, { useEffect, useRef, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { loginUser, loginVerification } from "../../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";
import http from "../../services/http.service";
import { LANG } from "../../constants/language";
import { resendVerifyCode } from "../../services/onBoardingService";
import BackIcon from "../../icons/BackIcon";


const LoginVerification = () => {
  const route = all_routes;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState("");
  const user = useSelector((state: any) => state.user);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<any>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!user?.userDetail?.userDetail?.email) {
      navigate(`/auth/login`)
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      formik.setFieldValue("otp", newOtp);
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (index: number, value: string) => {
    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    // Logic to resend the code
    try {
      const result: any = await resendVerifyCode({ email: user?.userDetail?.userDetail?.email });
      if (result.status == 200) {
        toast.success(LANG.OTP_SEND);
        setError(null)
      }
      setOtp(["", "", "", ""]);
    }
    catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.responseMessage)
      }
      setError(""); // Reset error
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
  
    if (!/^\d+$/.test(paste)) return; // Only allow digits
  
    const digits = paste.slice(0, 4).split(""); // adjust length if you want more OTP boxes
  
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (i < newOtp.length) {
        newOtp[i] = digit;
      }
    });
  
    setOtp(newOtp);
    formik.setFieldValue("otp", newOtp);
  
    // Focus the next empty input
    const nextIndex = digits.length < otp.length ? digits.length : otp.length - 1;
    inputRefs.current[nextIndex]?.focus();
  };  

  const loginValidationSchema = Yup.object().shape({
  });

  const initialValues = {
    otp: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const otpString = otp.join("");
        const result = await loginVerification({ email: user?.userDetail?.userDetail?.email, otp: otpString });

        if (result.status == 200) {
          toast.success(LANG.LOGIN_SUCCESSFULLY);
          localStorage.setItem('token', result.data?.data?.token);
          localStorage.setItem('id', result.data?.data?._id);

          dispatch(setLogin(true));
          dispatch(setUserDetail({ userDetail: result.data?.data }));
          http.defaults.headers['Authorization'] = result.data?.data?.token;
          navigate(`${route.subscription}?token=${authToken || localStorage.getItem("token")}`);

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
                        <h2 className="text-center">Enter your verification code</h2>
                        <p className="text-center">
                          We have sent it to {user?.userDetail?.userDetail?.email}
                        </p>
                        <div className="tab-content1" id="myTabContent1">
                          <div
                            className="tab-pane1 fade1 show1 active1"
                            id="user"
                            role="tabpane1l"
                            aria-labelledby="user-tab1"
                          >
                            {/* Login Form */}
                            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                              <div className="form-group OtpForm">
                                <div className="d-flex groupInputs justify-content-center">
                                  {otp.map((digit: any, index: any) => (
                                    <input
                                      className={error ? "border-warning" : ""}
                                      key={index}
                                      type="number"
                                      placeholder="_"
                                      maxLength={1}
                                      value={digit}
                                      onChange={(e) =>
                                        handleOtpChange(index, e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Backspace") {
                                          handleBackspace(index, e.currentTarget.value);
                                        }
                                      }}
                                      ref={(el) => (inputRefs.current[index] = el)}
                                      onPaste={(e) => handlePaste(e)}
                                    />
                                  ))}
                                </div>
                                {error && (
                                  <p
                                    className="text-center mt-2 text-warning"
                                  >
                                    ⚠ {error}
                                  </p>
                                )}
                              </div>
                              <div className="text-center mt-3">
                                <button
                                  type="button"
                                  className="btn btn-link p-0"
                                  style={{
                                    color: "#0081FF",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleResendCode}
                                >
                                  Get a new code
                                </button>
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

export default LoginVerification;
