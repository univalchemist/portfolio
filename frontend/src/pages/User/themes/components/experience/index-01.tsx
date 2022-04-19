import React from 'react'

import { ContentTitle, Timeline, TimelineCard } from '@components/index'

import { Experience } from '@graphql/graphql'

interface Props {
  id?: string
  data: Experience[]
}

const ExperienceArea: React.FC<Props> = ({ data, id = 'experiences' }) => {
  return (
    <div className="personal-experience-inner mt--40" id={id}>
      <div className="row">
        <div className="col-12">
          <div className="content">
            <ContentTitle title="Job Experience" />
            <div className="row">
              <div className="col-12 col-md-10 col-lg-7">
                {data.length > 0 && (
                  <Timeline>
                    {data.map((datum: Experience, index: number) => (
                      <TimelineCard
                        key={`experience-${index}`}
                        title={datum.title}
                        subtitle={`${datum.at} (${datum.startedFrom} - ${
                          datum.endedAt || ''
                        })`}
                        description={datum.description}
                      />
                    ))}
                  </Timeline>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceArea
