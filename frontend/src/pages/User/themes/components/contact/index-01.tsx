import React from 'react'

import { SectionTitle } from '@components/index'

import { ExternalLink } from '@graphql/graphql'
import { ProfileUser } from '@root/types'
import { AVAILABILITY_TEXT } from '@root/constants'
import { fullName } from '@utils/index'
import ContactLogo01 from '@assets/images/contact-logo-01.jpg'
import ContactForm from './form'
import ContactInfoCard from './info'

interface Props {
  id?: string
  data: ProfileUser | undefined
  platform?: ExternalLink
}

const ContactArea: React.FC<Props> = ({ data, platform, id = 'contacts' }) => {
  return (
    <div className="rn-contact-area rn-section-gap section-separator" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              title="Contact With Me"
              subtitle="CONTACT"
              align="center"
            />
          </div>
        </div>
        <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
          <div className="col-lg-5">
            <ContactInfoCard
              image={ContactLogo01}
              title={fullName({
                firstName: data?.firstName,
                middleName: data?.middleName,
                lastName: data?.lastName,
              })}
              subtitle={data?.title}
              description={data?.availability || AVAILABILITY_TEXT}
              phone={data?.phone}
              email={data?.email}
              address={data?.address}
              socials={data?.links || []}
            />
          </div>
          <div data-aos-delay="600" className="col-lg-7 contact-input">
            <ContactForm userId={data?.id} platform={platform} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactArea
