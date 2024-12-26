import http from "./http.service"
export const CHECK_COMPANY_STATUS = `/auth/employee/checkCompanyStatus`;
export const SEND_COMPANY_REFERRAL = `/auth/employee/sendCompanyReferral`;
export const VERIFY_OTP = `/auth/employee/verifyCode`;
export const RESEND_VERIFY_CODE = `/auth/employee/resendVerifyCode`;
export const ADD_ACCOUNT_DETAILS = `/auth/employee/addDetails`;


export const checkCompanyStatus = async (payload: any) => {
   return http.post(CHECK_COMPANY_STATUS, payload);
}

export const sendCompanyReferral = async (payload: any) => {
   return http.post(SEND_COMPANY_REFERRAL, payload);
}

export const verifyOtp = async (payload: any) => {
   return http.put(VERIFY_OTP, payload);
}

export const resendVerifyCode = async (payload: any) => {
   return http.put(RESEND_VERIFY_CODE, payload);
}

export const addAccountDetails = async (payload: any) => {
   return http.post(ADD_ACCOUNT_DETAILS, payload);
}

