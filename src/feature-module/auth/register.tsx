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
import { addAccountDetails, registerFirstStep, verifyOtp } from "../../services/onBoardingService";
import StepFive from "./register-steps/stepFive";
import StepSeven from "./register-steps/stepSeven";
import ThankYou from "./register-steps/thankYou";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const registerInitialValues = {
  type: "",
  firstName: "",
  lastName: "",
  phone: "",
  dob: "",
  email: "",
  password: "",
  nationality: ""
};

const stepFirstInitialValues = {
  name: "",
  businessName: "",
  email: "",
  businessWebsite: "",
  phone: ""
}

const stepSecondInitialValues = {
  otp: ""
}

const stepThirdInitialValues = {
  wellnessTypeId: ""
}

const stepFourInitialValues = {}

const stepFiveInitialValues = {}
const stepSixInitialValues = {
  services: []
}

const stepSevenInitialValues = {
  checkinRate: ""
}

const stepFirstRegisterSchema = Yup.object().shape({
  name: Yup.string().required("Field is required"),
  businessName: Yup.string().required("Bussiness name is required"),
  email: Yup.string().email("Please add valid email").required(),
  businessWebsite: Yup.string(),
  phone: Yup.string().min(10, LANG.MINIMUM_LIMIT_PHONE_CHAR).max(13, LANG.MAXIMUM_LIMIT_HUNDRED_CHAR).matches(phoneRegExp, 'Phone number is not valid'),
});

const stepSecondRegisterSchema = Yup.object().shape({
});

const stepThirdRegisterSchema = Yup.object().shape({
  wellnessTypeId: Yup.string().required("Field is required"),
});

const stepFourRegisterSchema = Yup.object().shape({});

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
  const [step, setStep]= useState<number>(1);

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifiedBussiness, setIsVerifiedBussiness] = useState<any>(false)
  const [submitDetails, setSubmitDetails] = useState({
    name: "",
    businessName: "",
    email: "",
    businessWebsite: "",
    phone: "",
  })
  const [wellnessTypeId, setWellnessTypeId] = useState("");
  const [locations, setLocations] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [checkinRate, setCheckinRate] = useState("");


  useEffect(()=>{
  },[setStep])

  const stepOneFormik = useFormik({
    initialValues: stepFirstInitialValues,
    validationSchema: stepFirstRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const result = await registerFirstStep(values);
        if (result.status == 200) {
          toast.success("Business details saved");
          let state = { ...submitDetails, ...values }
          setSubmitDetails(state)
          setStep(2);
        } else if (result.status == 404) {
          toast.error("Something went wrong");
        }

      } catch (error: any) {
        if (error?.response?.data?.responseCode == 400) {
          toast.error(error?.response?.data?.responseMessage);
        }
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
        const otpString = otp.join("");
        if (otpString.length === 4 && submitDetails.email != '') {
          const result: any = await verifyOtp({ email: submitDetails.email, otp: otpString });
          if (result.status == 200) {
            toast.success("Otp Verified Successfully");
            setError(null)
            setStep(3);
          }
          setOtp(["", "", "", ""]);
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

  const stepThirdFormik = useFormik({
    initialValues: stepThirdInitialValues,
    validationSchema: stepThirdRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        setStep(4);
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
        setStep(5);
      } catch (error) {
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
        if (locations.length == 0) {
          toast.error("Please select location first");
          return
        }
        setStep(6);
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const stepSixFormik = useFormik({
    initialValues: stepSixInitialValues,
    validationSchema: stepSixRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value:", values);
      setLoading(true);
      try {
        setStep(7);
      } catch (error) {
        console.log(error, loading)
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const onBackClick = () => {
    if(step > 0) {
      setStep(step-1)
    }
  } 

  const onSkipNow =() => {
    setStep(5);
  }

  const stepSevenFormik = useFormik({
    initialValues: stepSevenInitialValues,
    validationSchema: stepSevenRegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Selected Value stepSeven :", values);
      console.log("wellnessTypeId :", wellnessTypeId);
      setLoading(true);
      try {
        let partnerData = {
          ...submitDetails,
          wellnessTypeId,
          isGoogleVerified: isVerifiedBussiness,
          ...values,
          services,
          locations
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
  const renderLayout = (activeStep: number) => {

    switch (activeStep) {
      case 1: {
        return <StepFirst formik={stepOneFormik}/>;
      }
      case 2: {
        return <StepSecond formik={stepSecondFormik} otp={otp} setOtp={setOtp} submitDetails={submitDetails} error={error} setError={setError} onBackClick={onBackClick}/>;
      }
      case 3: {
        return <StepThird formik={stepThirdFormik} wellnessTypeId={wellnessTypeId} setWellnessTypeId={setWellnessTypeId} onBackClick={onBackClick}/>;
      }
      case 4: {
        return <StepFour formik={stepFourFormik} isVerifiedBussiness={isVerifiedBussiness} setIsVerifiedBussiness={setIsVerifiedBussiness} onBackClick={onBackClick} onSkipNow={onSkipNow}/>;
      }
      case 5: {
        return <StepFive formik={stepFiveFormik} locations={locations} setLocations={setLocations} onBackClick={onBackClick}/>;
      }
      case 6: {
        return <StepSix formik={stepSixFormik} services={services} setServices={setServices} onBackClick={onBackClick}/>;
      }
      case 7: {
        return <StepSeven formik={stepSevenFormik} checkinRate={checkinRate} setCheckinRate={setCheckinRate} onBackClick={onBackClick}/>;
      }
      case 8: {
        return <ThankYou email={submitDetails.email}/>;
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
