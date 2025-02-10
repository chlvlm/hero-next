'use server'
import { LoginSigUpData, LoginType, SendEmailType, SignUpType } from '@/types/pages/login'
import { request } from './request'
import { API_PATHS } from './api-path'

export async function sendEmail(data: SendEmailType) {
  return request<{ code: string }>(API_PATHS.SEND_EMAIL, {
    method: 'POST',
    data,
  })
}

export async function signUp(data: SignUpType) {
  return request<LoginSigUpData | null>(API_PATHS.SIGN_UP, {
    method: 'POST',
    data,
  })
}
// provider

export async function login(data: LoginType) {
  return request<LoginSigUpData | null>(API_PATHS.LOGIN, {
    method: 'POST',
    data,
  })
}
