export type SignUpType = {
  email: string
  password: string
  email_verify_code: string
}

export type LoginType = Pick<SignUpType, 'email' | 'password'>

export type SendEmailType = Pick<SignUpType, 'email'>

export type LoginSigUpData = {
  jwt: string
}

export enum EmailModalType {
  Login = 'Log In',
  SignUp = 'Sign Up',
}
