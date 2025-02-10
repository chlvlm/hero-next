'use server'
import { deleteToken, getToken } from '@/app/actions'
import { computedParams } from './computed-params'

// export const NEXT_PUBLIC_WAGMI_RPC_URL = 'http://34.150.60.154:8000' // vercel可配置成环境变量

const BASE_URL = 'http://34.150.60.154:8000'

type RequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface ExtendedRequestInit extends RequestInit {
  method: RequestMethod
  data?: any
}
interface SuccessData<T> {
  message: string
  code: number
  data: T
}

interface ErrorData {
  message: string
  code: number
  data?: any
}

export const request = async <T = any>(url: string, config: ExtendedRequestInit): Promise<SuccessData<T>> => {
  const token = await getToken()

  let finalConfig = { ...config }

  // Handle GET request query parameters
  if (finalConfig.method === 'GET') {
    const data = finalConfig.data || {}
    url = `${url}?${computedParams(data)}`
  } else if (finalConfig.data) {
    finalConfig.body = JSON.stringify(finalConfig.data)
  }

  finalConfig.cache = 'no-store'
  finalConfig.headers = {
    'Content-Type': 'application/json',
    ...finalConfig.headers,
    Authorization: token ? `Bearer ${token}` : '',
  }

  const response = await fetch(BASE_URL + url, finalConfig)
  const responseData = await response.json()

  if (!response.ok) {
    if (response.status === 401) {
      await deleteToken()
    }

    // Throw a structured error for easier debugging
    const error: ErrorData = {
      message: responseData?.message || 'Request failed',
      code: response.status,
      data: responseData?.data,
    }
    throw error
  }

  return responseData
}
