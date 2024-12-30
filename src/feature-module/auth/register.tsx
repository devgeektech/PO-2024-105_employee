import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LANG } from "../../constants/language";
import StepFirst from "./register-steps/stepFirst";
import StepSecond from "./register-steps/stepSecond";
import StepThird from "./register-steps/stepThird"
import StepFour from "./register-steps/stepFour"
import { addAccountDetails, checkCompanyStatus, sendCompanyReferral, verifyOtp } from "../../services/onBoardingService";
import StepFive from "./register-steps/stepFive";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const stepFirstInitialValues = {
  companyName: "",
}
const stepSecondInitialValues = {
  email: ""
}
const stepThirdInitialValues = {
  otp: ""
}
const stepFourInitialValues = {
  domainName: "",
}
const stepFiveInitialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  age: ""
}

const stepFirstRegisterSchema = Yup.object().shape({
  companyName: Yup.string().required("Field is required"),
});

const stepSecondRegisterSchema = Yup.object().shape({
  email: Yup.string().email("Please add valid email").required(),
});

const stepThirdRegisterSchema = Yup.object().shape({
});

const stepFourRegisterSchema = Yup.object().shape({
  domainName: Yup.string().required("Domain name is required"),
});

const stepFiveRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Field is required"),
  lastName: Yup.string().required("Field is required"),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13, LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).matches(phoneRegExp, 'Phone number is not valid'),
  age: Yup.string().min(2, LANG.MINIMUM_AGE_LIMIT).max(2, LANG.MINIMUM_AGE_LIMIT),
});


const Signin = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const [error, setError] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isVerifiedBussiness, setIsVerifiedBussiness] = useState<any>(false);
  const [companyName, setCompanyName] = useState<any>("");
  const [domainName, setDomainName] = useState<any>("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [submitDetails, setSubmitDetails] = useState({
    // name: "",
    companyName: "",
    email: "",
    // businessWebsite: "",
    // phone: "",
  });

  useEffect(() => {
  }, [setStep])

  const stepOneFormik = useFormik({
    initialValues: stepFirstInitialValues,
    validationSchema: stepFirstRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(2);
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSecondFormik = useFormik({
    initialValues: stepSecondInitialValues,
    validationSchema: stepSecondRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let stepTwoPayload = {
          companyName,
          ...values
        };
        const result = await checkCompanyStatus(stepTwoPayload);
        setSubmitDetails(stepTwoPayload);

        if (result.status == 200) {
          if (result?.data?.data?.isCompanyVerified) {
            toast.success(result.data.responseMessage);
            setStep(3);
          }
          else {
            toast.error(result.data.responseMessage);
            setStep(4);
          }
        } else if (result.status == 404) {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepthirdFormik = useFormik({
    initialValues: stepThirdInitialValues,
    validationSchema: stepThirdRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const otpString = otp.join("");        
        if (otpString.length === 4 && submitDetails.email != '') {
          const result: any = await verifyOtp({ email: submitDetails.email, otp: otpString });
          if (result.status == 200) {
            toast.success("Otp Verified Successfully");
            setError(null)
            setStep(5);
          }
          setOtp(["", "", "", ""]);
        } 
        else if (otpString.length < 4){
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

  const stepFourFormik = useFormik({
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
          toast.success(result.data.responseMessage);
          navigate("/auth/login");
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

  const stepFiveFormik = useFormik({
    initialValues: stepFiveInitialValues,
    validationSchema: stepFiveRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let partnerData = {
          ...submitDetails,
          ...values
        };        
        const result = await addAccountDetails(partnerData);

        if (result.status == 200) {
          toast.success(result.data.responseMessage);
          navigate("/auth/login");
        } else if (result.status == 404) {
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
    setStep(5);
  }

  const makeReferral = () => {    
    setStep(4);
  }


  const renderLayout = (activeStep: number) => {

    switch (activeStep) {
      case 1: {
        return <StepFirst formik={stepOneFormik} setIsVerifiedBussiness={setIsVerifiedBussiness} setCompanyName={setCompanyName}  makeReferral={makeReferral} />;
      }
      case 2: {
        return <StepSecond formik={stepSecondFormik} onBackClick={onBackClick} />;
      }
      case 3: {
        return <StepThird formik={stepthirdFormik} otp={otp} setOtp={setOtp} submitDetails={submitDetails} error={error} setError={setError}/>;
      }
      case 4: {
        return <StepFour formik={stepFourFormik} submitDetails={submitDetails} />;
      }
      case 5: {
        return <StepFive formik={stepFiveFormik} submitDetails={submitDetails} />;
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
