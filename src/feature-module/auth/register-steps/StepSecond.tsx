import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import BackIcon from "../../../icons/BackIcon";
import { resendVerifyCode } from "../../../services/onBoardingService";
import { toast } from "react-toastify";
import { LANG } from "../../../constants/language";
import { AxiosError } from "axios";

const StepSecond = ({ formik, otp, setOtp, submitDetails, error, setError }: any) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
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

  console.log('submitDetails -------- ', submitDetails);
  

  const handleResendCode = async () => {
    // Logic to resend the code
    try {
      const result: any = await resendVerifyCode({ email: submitDetails.email });
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
                      <ImageWithBasePath
                        src="assets/img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </header>
                    <div className="shadow-card">
                      <h2 className="text-center">Enter your verification code</h2>
                      <p className="text-center">
                        We sent it to {submitDetails.email}
                      </p>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="user"
                          role="tabpanel"
                          aria-labelledby="user-tab"
                        >
                          {/* Login Form */}
                          <form autoComplete="off" onSubmit={formik.handleSubmit}>
                            <div className="form-group OtpForm">
                              <div className="d-flex groupInputs justify-content-center">
                                {otp.map((digit: any, index: any) => (
                                  <input
                                    className={error ? "border-warning" : ""}
                                    key={index}
                                    type="text"
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

export default StepSecond;
