/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import {
  ToastContainer,
  toast,
  ToastOptions,
  TypeOptions as ToastType,
} from 'react-toastify'

import { AppUser, IThemes } from '@root/types'
import { Admin, ExternalLink, useSignInMutation } from '@graphql/graphql'
import { useStorage } from '@hooks/index'
import { ADMIN_TOKEN_KEY, USER_CONFIG_KEY } from '@root/constants'
import 'react-toastify/dist/ReactToastify.css'

export interface UserConfig {
  userSlug?: string
  profileUrl?: string
  availableLinks?: ExternalLink[]
  platform?: ExternalLink
  contactable?: boolean
  theme?: IThemes
}

interface SignInParams {
  email?: string
  password?: string
  accessToken?: string
}
type Callback = (status: boolean, message: string) => void

interface AppContext {
  config: UserConfig
  user: AppUser
  admin: Admin | undefined
  authenticated: boolean
  loading: boolean
  onSetConfig: (data: Partial<UserConfig>) => void
  onSetUser: (data: Partial<AppUser>) => void
  onAdminSignIn: (params: SignInParams, callback?: Callback) => void
  onAdminSignOut: (callback?: () => void) => void
  notifyMessage: (
    type: ToastType,
    message: string,
    theme?: 'light' | 'dark',
  ) => void
}

export const AppContext = React.createContext<AppContext>({
  config: {} as UserConfig,
  user: {} as AppUser,
  admin: undefined,
  authenticated: false,
  loading: false,
  onSetConfig: () => null,
  onSetUser: () => null,
  onAdminSignIn: () => null,
  onAdminSignOut: () => null,
  notifyMessage: () => null,
})

export const AppContextProvider: React.FC = ({ children }) => {
  const [, setToken, unsetToken] = useStorage<string | undefined>(
    ADMIN_TOKEN_KEY,
    undefined,
  )
  const [, setUserConfig] = useStorage<UserConfig | undefined>(
    USER_CONFIG_KEY,
    undefined,
  )

  const [config, setConfig] = useState<UserConfig>({})
  const [user, setUser] = useState<AppUser>({} as AppUser)
  const [admin, setAdmin] = useState<Admin | undefined>()
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const [signIn, { loading: signingIn }] = useSignInMutation()

  const onAdminSignIn = useCallback(
    ({ email, password, accessToken }, callback) => {
      signIn({
        variables: {
          email,
          password,
          accessToken,
        },
        onCompleted: res => {
          if (res?.signIn.data?.accessToken) {
            setUser({} as AppUser)
            setToken(`Bearer ${res.signIn.data.accessToken}`, false, false)
            setAdmin(res.signIn.data.admin)
            setAuthenticated(true)
          } else {
            unsetToken()
            setAdmin(undefined)
            setAuthenticated(false)
          }
          callback(
            res?.signIn?.status || false,
            res?.signIn?.message || 'Email or password is incorrect.',
          )
        },
        onError: err => {
          console.log({ err })
        },
      })
    },
    [setToken, signIn, unsetToken],
  )

  const onAdminSignOut = useCallback(
    (callback?: () => void) => {
      setAdmin(undefined)
      unsetToken()
      if (callback) callback()
    },
    [unsetToken],
  )

  const onSetUser = useCallback((d: Partial<AppUser>) => {
    setUser(u => ({ ...u, ...d }))
  }, [])

  const onSetConfig = useCallback(
    (d: Partial<UserConfig>) => {
      const _config = { ...config, ...d }
      setConfig(_config)
      setUserConfig(_config)
    },
    [config, setUserConfig],
  )

  const onNotifyMessage = useCallback(
    (type: ToastType, message: string, theme?: 'light' | 'dark') => {
      const opts: ToastOptions = {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: ctx =>
          `${ctx?.defaultClassName} Toastify__toast-theme--${theme || 'light'}`,
      }
      if (type === 'info') {
        toast.info(message, opts)
      } else if (type === 'success') {
        toast.success(message, opts)
      } else if (type === 'warning') {
        toast.warn(message, opts)
      } else if (type === 'error') {
        toast.error(message, opts)
      } else {
        toast(message, opts)
      }
    },
    [],
  )

  return (
    <AppContext.Provider
      value={{
        config,
        user,
        admin,
        authenticated,
        loading: signingIn,
        onSetConfig,
        onSetUser,
        onAdminSignIn,
        onAdminSignOut,
        notifyMessage: onNotifyMessage,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  )
}
