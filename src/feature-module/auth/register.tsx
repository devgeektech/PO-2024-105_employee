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
import StepSix from "./register-steps/stepSix";
import { addAccountDetails, checkCompanyStatus, registerFirstStep, sendCompanyReferral, verifyOtp } from "../../services/onBoardingService";
import StepFive from "./register-steps/stepFive";
import StepSeven from "./register-steps/stepSeven";
import ThankYou from "./register-steps/thankYou";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const stepFirstInitialValues = {
  companyName: "",
}
const stepSecondInitialValues = {
  email: ""
}
const stepFourInitialValues = {
  domainName: "",
}

const stepFirstRegisterSchema = Yup.object().shape({
  companyName: Yup.string().required("Field is required"),
  // businessWebsite: Yup.string(),
  // phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13, LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).matches(phoneRegExp, 'Phone number is not valid'),
});

const stepSecondRegisterSchema = Yup.object().shape({
  email: Yup.string().email("Please add valid email").required(),
});

const stepThirdRegisterSchema = Yup.object().shape({
  wellnessTypeId: Yup.string().required("Field is required"),
});

const stepFourRegisterSchema = Yup.object().shape({
  domainName: Yup.string().required("Domain name is required"),
});

const stepFiveRegisterSchema = Yup.object().shape({});
const stepSixRegisterSchema = Yup.object().shape({
  services: Yup.array().min(1, "At least one service must be selected").required("Field is required"),
});

const stepSevenRegisterSchema = Yup.object().shape({
  checkinRate: Yup.string().required("Field is required"),
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
            toast.error(result.data.responseMessage);
            // setStep(3);

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

  const stepSevenFormik = useFormik({
    initialValues: stepSecondInitialValues,
    validationSchema: stepSevenRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value stepSeven :", values);
      setLoading(true);
      try {
        let partnerData = {
          ...submitDetails,
          isGoogleVerified: isVerifiedBussiness,
          ...values,
        };
        const result = await addAccountDetails(partnerData);

        if (result.status == 200) {
          toast.success(result.data.responseMessage);

          setStep(8);
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


  const renderLayout = (activeStep: number) => {

    switch (activeStep) {
      case 1: {
        return <StepFirst formik={stepOneFormik} setIsVerifiedBussiness={setIsVerifiedBussiness} setCompanyName={setCompanyName} />;
      }
      case 2: {
        return <StepSecond formik={stepSecondFormik} onBackClick={onBackClick} />;
      }


      case 4: {
        return <StepFour formik={stepFourFormik} submitDetails={submitDetails} />;
      }


      // case 7: {
      //   return <StepSeven formik={stepSevenFormik} checkinRate={checkinRate} setCheckinRate={setCheckinRate} onBackClick={onBackClick}/>;
      // }
      case 8: {
        return <ThankYou email={submitDetails.email} />;
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
