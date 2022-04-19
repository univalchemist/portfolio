import React, { useContext, useMemo } from 'react'
import classNames from 'classnames'

import { ScrollToTop, SEO } from '@components/index'
import { Children } from '@root/types'
import { fullName } from '@utils/index'
import { AppContext } from '@root/AppContext'

const OnlyLazy = React.lazy(() => import('./onlyLazy'))

interface Props {
  color?: number
  className?: string
  pageTitle?: string
  children: Children
}

const Layout: React.FC<Props> = ({
  children,
  color = 1,
  className,
  pageTitle,
}) => {
  const { user, config } = useContext(AppContext)

  const userName = useMemo(() => {
    return fullName({
      firstName: user.profile?.firstName,
      middleName: user.profile?.middleName,
      lastName: user.profile?.lastName,
    })
  }, [
    user.profile?.firstName,
    user.profile?.lastName,
    user.profile?.middleName,
  ])

  const metaDescription = useMemo(() => {
    const desc = (user.resume?.skills || [])
      .map(s => (s.visible ? s.name : null))
      .filter(d => !!d)
      .join(' ∙ ')

    return desc
      ? `${desc} Expert`
      : 'Senior web and mobile app developer with many years of track in various fields.'
  }, [user.resume?.skills])

  return (
    <>
      <SEO
        bodyClass={classNames(`template-color-${color} spybody`, className)}
        description={metaDescription}
        title="Senior web and mobile developer"
        titleTemplate={
          pageTitle ||
          `${
            userName
              ? `${userName} ∙ Senior developer`
              : 'Sr full-stack developer'
          }`
        }
        idUrl={config.profileUrl || location.href}
        image={
          user.profile?.avatar?.url ||
          'https://www.dropbox.com/s/kmdcqygtmoepqlw/p.png?dl=0&raw=1'
        }
      />
      <React.Suspense fallback={<div />}>
        <OnlyLazy />
      </React.Suspense>
      {children}
      <ScrollToTop />
    </>
  )
}

export default Layout
