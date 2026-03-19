import Cookies from "js-cookie";
import api from './AxiosInstance';


export const loginUser = async (data:any) => {

  const response = await api.post("/user/Login", data);

  const token = response.data.token;

  Cookies.set(window.CONFIG.TOKEN_KEY, token, {
    expires: 1,
    secure: false,
    sameSite: "Strict"
  });

  return response.data;
};

export const logoutUser = () => {
   return api.put("/user/Logout")
};

export const signupUser = (data:any) => {
  return api.post("/user/CreateUser", data);
};

export const forgotPassword = async (data:any) => {
  const response = await api.post("/user/forgot_password", data);
  return response.data;
};

interface OTPPayload {
  resetkey: string;
  otp?: number;
}

export const verifyOTP = async (data:OTPPayload) => {
  const response = await api.post("/user/Otpverify", data);

  return response.data;
};

interface OTPPayload {
  resetkey: string;
  otp?: number;
}

export const resendOTP = async (data:OTPPayload) => {
  const response = await api.post("/user/resendOTP",data);
  return response.data;
};

export const resetPassword = async (data:any) => {
  const response = await api.post("/reset_password", data);

  return response.data;
};
