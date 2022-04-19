import React from 'react'
import { useLocation, Location } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { ADMIN_PREFIX, SITE_URL } from '@root/constants'

interface Props {
  description: string
  image?: string
  title: string
  titleTemplate: string
  idUrl: string
  bodyClass: string
}

const SEO: React.FC<Props> = ({
  description: metaDescription,
  image: metaImage,
  title: metaTitle,
  titleTemplate: template,
  idUrl,
  bodyClass,
}) => {
  const location: Location = useLocation()

  const language = 'en'
  const bannerImage = metaImage
  const imgWidth = 100
  const imgHeight = 100
  const siteTitle = location.pathname.includes(ADMIN_PREFIX)
    ? 'Admin'
    : template || metaTitle

  const basSchema = [
    {
      '@type': 'Individual',
      '@id': `${SITE_URL}/#organization`,
      name: `${siteTitle}`,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        // url: site.siteMetadata.logo,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${siteTitle}`,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: language,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@graph': [...basSchema],
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      bodyAttributes={{
        class: bodyClass,
      }}
    >
      {/* General tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={template} />
      <meta name="description" content={metaDescription} />
      <meta name="image" content={bannerImage} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />

      {/* OpenGraph tags */}
      <meta property="og:locale" content={language} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:url" content={idUrl} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={bannerImage} />
      <meta property="og:image:secure_url" content={bannerImage} />
      <meta property="og:image:width" content={`${imgWidth}px`} />
      <meta property="og:image:height" content={`${imgHeight}px`} />
      <meta property="og:image:alt" content={template} />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta
        name="twitter:creator"
        content={site.siteMetadata.twitterUsername}
      /> */}
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={bannerImage} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Helmet>
  )
}

export default SEO
