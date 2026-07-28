export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  message: string;
}
