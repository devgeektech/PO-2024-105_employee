import { AxiosError } from "axios";
import http from "./http.service"
export const REQUEST_PASSWORD_URL = `/auth/admin/forgot_password`;
export const RESET_PASSWORD_URL = `/auth/admin/reset_password`;
export const ACCOUNT_VERIFICATION_URL = `/auth/member/verifyAccount`;
export const EMAIL_EXIST_URL = `/auth/member/exists`;
export const CHECK_MEMBER_URL = `/auth/member/checkMember`;
export const REGISTER_FIRST_STEP = `/auth/partner/signup`;
export const VERIFY_OTP = `/auth/partner/verifyCode`;
export const ADD_ACCOUNT_DETAILS = `/auth/partner/add`;
export const RESEND_VERIFY_CODE = `/auth/partner/resendVerifyCode`;


export const registerFirstStep= async (payload:any)=>{
   return http.post(REGISTER_FIRST_STEP, payload);
}

export const verifyOtp = async (payload:any)=>{
   return http.put(VERIFY_OTP, payload);
}

export const addAccountDetails= async (payload:any)=>{
   return http.post(ADD_ACCOUNT_DETAILS, payload);
}

export const resendVerifyCode = async (payload:any)=>{
   return http.put(RESEND_VERIFY_CODE, payload);
}