import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  useLocation,
  useNavigate,
  NavigateFunction,
  Location,
} from 'react-router-dom'
import { ArrowRight } from 'react-feather'
import Spinner from 'react-bootstrap/Spinner'

import SignInLogo from '@assets/images/logo.png'
import { Button, Form, FormRow } from '@components/index'
import { AppContext } from '@root/AppContext'
import { ADMIN_PREFIX, ADMIN_TOKEN_KEY } from '@root/constants'
import { dashboardPath, getStorageValue } from '@utils/index'

interface FormType {
  email: string
  password: string
}

const SignInPage: React.FC = () => {
  const timer = useRef<NodeJS.Timeout | undefined>()
  const navigate: NavigateFunction = useNavigate()
  const { state }: Location = useLocation()

  // @ts-ignore
  const from = state?.from?.pathname || `/${ADMIN_PREFIX}/${dashboardPath}`

  const { onAdminSignIn, authenticated, loading, notifyMessage } =
    useContext(AppContext)

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (loaded) return
    const accessToken = getStorageValue(ADMIN_TOKEN_KEY)
    if (!authenticated && accessToken) {
      timer.current = setTimeout(() => {
        onAdminSignIn({ accessToken }, (_status: boolean) => {
          setLoaded(true)
          if (_status) {
            navigate(from, { replace: true })
          }
        })
      }, 1500)
    } else {
      setLoaded(true)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [authenticated, from, loaded, navigate, onAdminSignIn])

  const onSignIn = useCallback(
    (data: FormType, e: any) => {
      onAdminSignIn(data, (_status: boolean, _message: string) => {
        notifyMessage(_status ? 'success' : 'error', _message, 'dark')
        if (_status) {
          e.target.reset()
          navigate(from, { replace: true })
        }
      })
    },
    [from, navigate, notifyMessage, onAdminSignIn],
  )

  return (
    <div className="sign-in-container">
      <div className="sign-in-image-wrapper">
        <img src={SignInLogo} />
      </div>
      {loaded ? (
        <div className="sign-in-form-wrapper">
          <div className="introduce">
            <Form
              className="rnt-sign-in-form rwt-dynamic-form row"
              id="sign-in-form"
              onSubmit={onSignIn}
            >
              <FormRow
                className="col-lg-6"
                name="email"
                label="Email"
                type="email"
                required
              />
              <FormRow
                className="col-lg-6"
                name="password"
                label="Password"
                type="password"
                required
              />
              <div className="col-lg-12 d-flex justify-content-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="sign-in-button"
                >
                  <span>{loading ? 'SIGNING IN' : 'SIGN IN'}</span>
                  <ArrowRight />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="sign-in-loading">
          <Spinner animation="grow" variant="light" />
        </div>
      )}
    </div>
  )
}

export default SignInPage
