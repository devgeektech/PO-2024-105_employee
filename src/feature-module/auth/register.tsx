import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LANG } from "../../constants/language";
import StepFirst from "./register-steps/stepFirst";
import StepSecond from "./register-steps/StepSecond";
import StepThird from "./register-steps/StepThird"
import StepFour from "./register-steps/StepFour"
import { addAccountDetails, addEmployeeProfile, checkCompanyStatus, sendCompanyReferral, verifyOtp } from "../../services/onBoardingService";
import { useDispatch } from "react-redux";
import { setLogin, setUserDetail } from "../../core/data/redux/user/userSlice";
import http from "../../services/http.service";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const nameRegex = /^[A-Za-z][A-Za-z\s]{0,49}[A-Za-z]$/;

const stepFirstInitialValues = {
  email: ""
}
const stepThirdInitialValues = {
  otp: ""
}
const stepFourInitialValues = {
  companyName: "",
}
const stepFiveInitialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  dob: ""
}

const stepFirstRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    )
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required("Field is required"),
});

const stepThirdRegisterSchema = Yup.object().shape({
});

const stepFourRegisterSchema = Yup.object().shape({
  companyName: Yup.string().required("Field is required"),
});

const stepFiveRegisterSchema = Yup.object().shape({
  firstName: Yup.string().matches(nameRegex, 'The first name can only include letters, spaces, hyphens, or apostrophes.').required("Field is required"),
  lastName: Yup.string().matches(nameRegex, 'The last name can only include letters, spaces, hyphens, or apostrophes.').required("Field is required"),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(12, LANG.MAXIMUM_LIMIT_PHONE_CHAR).matches(phoneRegExp, 'Phone number is not valid'),
  dob: Yup.string(),
});


const Signin = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [error, setError] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isVerifiedBussiness, setIsVerifiedBussiness] = useState<any>(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [submitDetails, setSubmitDetails] = useState({ email: "" });
  const [companyId, setCompanyId] = useState<any>("");
  const dispatch = useDispatch();


  useEffect(() => {
  }, [setStep])


  const stepFirstFormik = useFormik({
    initialValues: stepFirstInitialValues,
    validationSchema: stepFirstRegisterSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const validateEmail = await checkCompanyStatus({ ...values });
        if (validateEmail.status == 200) {
          if (validateEmail?.data?.data?.isCompanyVerified) {
            // toast.success(validateEmail.data.responseMessage);

            const result = await addEmployeeProfile({ ...values, companyId: validateEmail?.data?.data?.companyId });
            setSubmitDetails({ ...values });
            setCompanyId({ companyId: validateEmail?.data?.data?.companyId })

            if (result.status == 200) {
              // toast.success(result.data.responseMessage);
              setStep(2);
            } else if (result.status == 404) {
              toast.error("Something went wrong");
            }
          }
          else {
            toast.error(validateEmail.data.responseMessage);
            // setStep(4);
          }
        } else if (validateEmail.status == 404) {
          toast.error("Something went wrong");
        }
      } catch (error: any) {
        console.log(error, loading)
        toast.error(error?.response?.data?.responseMessage);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSecondFormik = useFormik({
    initialValues: stepThirdInitialValues,
    validationSchema: stepThirdRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const otpString = otp.join("");
        if (otpString.length === 4 && submitDetails.email != '') {
          const result: any = await verifyOtp({ email: submitDetails.email, otp: otpString });
          if (result.status == 200) {
            // toast.success("Otp Verified Successfully");
            setError(null)
            setStep(4);
          }
          setOtp(["", "", "", ""]);
        }
        else if (otpString.length < 4) {
          setError("Please enter valid Otp")
        }
      } catch (error: any) {
        if (error?.response?.data?.responseCode == 400) {
          toast.error(error?.response?.data?.responseMessage);
          setError("Make sure it maches the one in your email")
        }
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepthirdFormik = useFormik({
    initialValues: stepFourInitialValues,
    validationSchema: stepFourRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let stepFourPayload = {
          ...submitDetails,
          ...values
        };
        const result = await sendCompanyReferral(stepFourPayload);
        if (result.status == 200) {
          // toast.success(result.data.responseMessage);
          navigate("/auth/thank-you");
        }
        else if (result.status == 404) {
          toast.error("Something went wrong");
        }
      }
      catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepFourFormik = useFormik({
    initialValues: stepFiveInitialValues,
    validationSchema: stepFiveRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let partnerData = {
          ...submitDetails,
          ...values,
          ...companyId,
        };
        const result = await addAccountDetails(partnerData);

        if (result.status == 200) {
          localStorage.setItem('token', result.data?.data?.token);
          localStorage.setItem('id', result.data?.data?._id);

          dispatch(setLogin(true));
          dispatch(setUserDetail({ userDetail: result.data?.data }));
          http.defaults.headers['Authorization'] = result.data?.data?.token;

          const token = result.data?.data?.token || localStorage.getItem("token");
          const id = result.data?.data?._id || localStorage.getItem("id");

          navigate(`${route.subscription}?token=${token}&id=${id}`);
          // navigate(`${route.subscription}?token=${result.data?.data?.token || localStorage.getItem("token")}`);
        }
        else if (result.status == 404) {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const onBackClick = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const onSkipNow = () => {
    setStep(4);
  }

  const makeReferral = () => {
    setStep(3);
  }


  const renderLayout = (activeStep: number) => {

    switch (activeStep) {
      case 1: {
        return <StepFirst formik={stepFirstFormik} makeReferral={makeReferral} />;
      }
      case 2: {
        return <StepSecond formik={stepSecondFormik} otp={otp} setOtp={setOtp} submitDetails={submitDetails} error={error} setError={setError} />;
      }
      case 3: {
        return <StepThird formik={stepthirdFormik} submitDetails={submitDetails} />;
      }
      case 4: {
        return <StepFour formik={stepFourFormik} submitDetails={submitDetails} />;
      }
    }
  }

  return (
    <div>
      <>
        {renderLayout(step)}
      </>
    </div>
  );
};

export default Signin;
