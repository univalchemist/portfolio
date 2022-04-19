import React from 'react'

import { AppContext } from '@root/AppContext'

import Header from '../components/header/index-02'
import Footer from '../components/footer/index-01'
import HeroArea from '../components/hero/index-03'
import ServicesArea from '../components/services/index-04'
import PortfoliosArea from '../components/portfolios/index-01'
import ResumeArea from '../components/resume/index-01'
import ClientArea from '../components/client/index-01'
import ContactArea from '../components/contact/index-01'
import CVDownload from '../components/userCV'

const UserThemeDefault = () => {
  const {
    user,
    config: { platform, contactable, profileUrl },
  } = React.useContext(AppContext)

  return (
    <>
      <Header contactable={contactable} />
      <main className="page-wrapper-two">
        <HeroArea data={user.profile} contactable={contactable} />
        <ServicesArea data={user.features || []} />
        <PortfoliosArea data={user.portfolios || []} />
        <ResumeArea data={user.resume} />
        <ClientArea data={user.clients || []} />
        {contactable && <ContactArea data={user.profile} platform={platform} />}
        <Footer data={user.profile} className="section-separator" />
        <CVDownload user={user} profileUrl={profileUrl} />
      </main>
    </>
  )
}

export default UserThemeDefault
