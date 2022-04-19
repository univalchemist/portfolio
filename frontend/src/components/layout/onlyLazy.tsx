import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Wow = require('wowjs')

const OnlyLazy = () => {
  let AOS: { refresh: () => void }
  useEffect(() => {
    const wow = new Wow.WOW({
      offset: 100,
      mobile: false,
      live: false,
    })
    wow.init()

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AOS = require('aos')
    AOS.init({
      once: true,
    })
  }, [])

  useEffect(() => {
    if (AOS) {
      AOS.refresh()
    }
  })

  return (
    <React.Fragment>
      <Helmet></Helmet>
    </React.Fragment>
  )
}

export default OnlyLazy
