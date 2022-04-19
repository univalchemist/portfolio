import React from 'react'

import { ContentTitle, Timeline, TimelineCard } from '@components/index'

import { Education } from '@graphql/graphql'

interface Props {
  id?: string
  data: Education[]
}

const EducationsArea: React.FC<Props> = ({ data, id = 'educations' }) => {
  return (
    <div className="personal-experience-inner mt--40" id={id}>
      <div className="row">
        <div className="col-12">
          <div className="content">
            <ContentTitle title="Education Quality" />
            <div className="row">
              <div className="col-12 col-md-10 col-lg-7">
                {data.length > 0 && (
                  <Timeline>
                    {data.map((datum: Education, index: number) => (
                      <TimelineCard
                        key={`education-${index}`}
                        title={datum.title}
                        subtitle={`${datum.at} (${datum.startedFrom} - ${
                          datum.endedAt || 'Now'
                        })`}
                        badge={datum.degree}
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

export default EducationsArea
