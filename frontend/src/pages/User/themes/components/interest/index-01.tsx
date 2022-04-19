import React from 'react'
import { Check } from 'react-feather'

import { ContentTitle } from '@components/index'
import { ProfileInterest } from '@root/types'

interface Props {
  id?: string
  data: ProfileInterest[]
}

const InterestsArea: React.FC<Props> = ({ data, id = 'interest' }) => {
  return (
    <div className="personal-experience-inner mt--40" id={id}>
      <div className="row">
        <div className="col-12">
          <div className="contnet">
            <ContentTitle title="My Interests" />
            <div className="rn-interest">
              <div className="interest-body pl-4">
                <p className="description mb-5">
                  I am very interested in the followings and already have enough
                  knowledge of them.
                </p>
                <div className="check-wrapper">
                  <div className="row">
                    {data.map((interest: ProfileInterest) => (
                      <div
                        className="col-12 col-md-6 col-lg-4 mb-3"
                        key={`interest-${interest.index}`}
                      >
                        <div className="check d-flex flex-wrap p-3 interest-item">
                          <Check />
                          <p className="interest-title mb-2">
                            {interest.title}
                          </p>
                          {!!interest.description && (
                            <div className="interest-description">
                              {interest.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterestsArea
