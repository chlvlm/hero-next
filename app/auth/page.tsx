'use client'
import { GithubIcon, TwitterIcon } from '@/components/icons'
import { EmailModalType } from '@/types/auth'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  Divider,
  Input,
} from '@heroui/react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'

const LoginInput = ({
  label,
  endContent = null,
  type = 'text',
  onChange,
  error,
  value,
}: {
  label: string
  endContent?: React.ReactNode
  error?: string
  type?: 'text' | 'password'
  onChange: (value: string) => void
  value: string
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <Input
      label={label}
      classNames={{ inputWrapper: 'h-[62px]' }}
      value={value}
      type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
      errorMessage={error}
      isInvalid={!!error}
      onChange={(e) => {
        const val = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
        onChange(val)
      }}
      endContent={
        endContent ? (
          endContent
        ) : type === 'password' ? (
          <Button
            isIconOnly
            aria-label="toggle password visibility"
            className="data-[hover=true]:bg-transparent"
            variant="light"
            radius="full"
            onPress={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="text-default-400" />
            ) : (
              <Eye className="text-default-400" />
            )}
          </Button>
        ) : null
      }
    />
  )
}

export default function AuthLogin() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('123456')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailVerifyCode, setEmailVerifyCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()
  const [typeName, setTypeName] = useState(EmailModalType.Login)
  const isLogin = useMemo(() => typeName === EmailModalType.Login, [typeName])
  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (!isLogin && confirmPassword !== password) {
      setError('The password and confirmation password do not match')
      return
    }
    if (!isLogin && !emailVerifyCode) return

    setIsLoading(true)

    try {
      await signIn('credentials', {
        email,
        password,
        type: isLogin ? 'login' : 'signup',
        email_verify_code: emailVerifyCode,
        redirect: true,
        callbackUrl: '/auth',
      })
    } catch (error) {
      console.error('Logon failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="my-auto flex h-full flex-col w-full items-center justify-center py-20 gap-5">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 p-6 pb-0">
          <h1 className="text-center text-2xl font-bold">
            {isLogin ? 'Email Login' : 'Sign Up by Email'}
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-6">
          <form onSubmit={handleCustomLogin} className="flex flex-col gap-4">
            <LoginInput label="Email" value={email} onChange={setEmail} />
            <div className="flex flex-col">
              <LoginInput
                label="Password"
                value={password}
                type="password"
                onChange={setPassword}
              />

              {typeName === EmailModalType.SignUp && (
                <div className={cn('p-1 text-xs text-default-400')}>
                  At least 8 characters, one number & one uppercase letter.
                </div>
              )}
            </div>
            {typeName === EmailModalType.SignUp && (
              <>
                <LoginInput
                  label="Confirm Password"
                  value={confirmPassword}
                  type="password"
                  onChange={(val) => {
                    if (val !== password) {
                      setError(
                        'The password and confirmation password do not match'
                      )
                    } else {
                      setError('')
                    }
                    setConfirmPassword(val)
                  }}
                  error={error}
                />

                <LoginInput
                  value={emailVerifyCode}
                  label="Verification Code"
                  onChange={setEmailVerifyCode}
                  endContent={
                    <Button
                      className="text-sm font-semibold text-primary data-[hover=true]:bg-transparent"
                      radius="full"
                      variant="light"
                      onPress={() => {}}
                    >
                      Send
                    </Button>
                  }
                />
              </>
            )}

            <Button
              radius="full"
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full"
            >
              {typeName}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1 text-base text-default-400">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <span
              className="cursor-pointer text-primary"
              onClick={() => {
                setTypeName(
                  isLogin ? EmailModalType.SignUp : EmailModalType.Login
                )
                setError('')
              }}
            >
              {isLogin ? EmailModalType.SignUp : EmailModalType.Login}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Divider className="flex-1" />

            <span className="text-sm text-default-400">or</span>

            <Divider className="flex-1" />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onPress={() => signIn('twitter', { callbackUrl: '/auth' })}
              className="w-full"
              color="default"
              variant="bordered"
              startContent={<TwitterIcon />}
              radius="full"
            >
              Login with Twitter
            </Button>
            <Button
              onPress={() => signIn('github', { callbackUrl: '/auth' })}
              className="w-full"
              color="default"
              variant="bordered"
              startContent={<GithubIcon />}
              radius="full"
            >
              Login with Github
            </Button>
          </div>
        </CardBody>
      </Card>
      {session.data && <Button onPress={() => signOut()}>Sign Out</Button>}
    </div>
  )
}
