import React, { useCallback, useState } from 'react'

import { ProfileFeature } from '@root/types'
import { Maybe } from '@graphql/graphql'
import { SectionTitle } from '@components/index'

import ServiceCard from './service01'
import ServiceModal from './serviceModal'
import './styles.scss'

interface Props {
  id?: string
  data: ProfileFeature[]
}

const ServicesArea: React.FC<Props> = ({ data, id = 'features' }) => {
  const [showModal, setShowModal] = useState(false)
  const [service, setService] = useState<
    { title: string; description: Maybe<string> } | undefined
  >()

  const onViewService = useCallback(
    (title: string, description: Maybe<string>) => {
      setService({ title, description })
      setShowModal(true)
    },
    [],
  )

  const onClose = useCallback(() => {
    setShowModal(false)
    setService(undefined)
  }, [])

  if (!data.length) return null

  return (
    <div className="rn-service-area rn-section-gap section-separator" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              align="center"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-once="true"
              title="What I Do"
              subtitle="Features"
            />
          </div>
        </div>
        <div className="row row--25 mt_md--10 mt_sm--10">
          {data.map((datum: ProfileFeature) => (
            <div
              key={datum.id}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-once="true"
              className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30"
            >
              <ServiceCard data={datum} onView={onViewService} />
            </div>
          ))}
        </div>
      </div>
      <ServiceModal
        show={showModal}
        title={service?.title}
        description={service?.description}
        onClose={onClose}
      />
    </div>
  )
}

export default ServicesArea
