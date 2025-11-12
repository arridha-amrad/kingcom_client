import { privateAxios, publicAxios } from '@/lib/axiosInterceptor';
import type { User } from '@/models/user.model';
import type { loginSchema, signupSchema } from '@/schemas/auth.schema';
import type z from 'zod';

const routes = {
  forgotPassword: '/auth/forgot-password',
  login: '/auth/login',
  logout: '/auth/logout',
  me: '/auth/me',
  refreshToken: '/auth/refresh-token',
  resendVerificationToken: '/auth/resend-verification',
  resetPassword: '/auth/reset-password',
  signup: '/auth/signup',
  verifyAccount: '/auth/verify-account',
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await publicAxios.post<{ message: string }>(
      routes.forgotPassword,
      { email },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export type LoginParams = z.infer<typeof loginSchema>;
export type LoginResponse = {
  user: User;
  token: string;
};
export const login = async (params: LoginParams) => {
  try {
    const res = await publicAxios.post<LoginResponse>(routes.login, params);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const res = await privateAxios.post<{ message: string }>(routes.logout);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const me = async () => {
  try {
    const res = await privateAxios.get<{ user: User }>(routes.me);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// return new access token
export const refreshToken = async () => {
  try {
    const res = await publicAxios.post<{ token: string }>(routes.refreshToken);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// return message and verification-token
export const resendVerification = async (email: string) => {
  try {
    const res = await publicAxios.post<SignupResponse>(
      routes.resendVerificationToken,
      { email },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export type ResetPasswordParams = {
  token: string;
  password: string;
  confirmPassword: string;
};
export const resetPassword = async (params: ResetPasswordParams) => {
  try {
    const res = await publicAxios.post<{ message: string }>(
      routes.resetPassword,
      params,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export type SignupParams = z.infer<typeof signupSchema>;
export interface SignupResponse {
  token: string;
  message: string;
}
// return message and verification-token
export const signup = async (params: SignupParams) => {
  try {
    const res = await publicAxios.post<SignupResponse>(routes.signup, params);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export type VerifyAccountParams = {
  code: string;
  token: string;
};
// return user and token. user automatically login
export const verifyAccount = async (params: VerifyAccountParams) => {
  try {
    const res = await publicAxios.post<LoginResponse>(
      routes.verifyAccount,
      params,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
