import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { ProfileResume } from '@root/types'
import { SectionTitle } from '@components/index'

import EducationsArea from '../education/index-01'
import SkillsArea from '../skill/index-01'
import ExperienceArea from '../experience/index-01'
import InterestsArea from '../interest/index-01'

interface Props {
  id?: string
  data: ProfileResume | undefined | null
}

const ResumeArea: React.FC<Props> = ({ data, id = 'resume' }) => {
  if (!data) return null

  return (
    <div className="rn-resume-area rn-section-gap section-separator" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle
              align="center"
              title="My Resume"
              subtitle={data?.description}
            />
          </div>
        </div>
        <div className="row mt--45">
          <div className="col-lg-12">
            <Tabs
              defaultActiveKey={`${id}-education`}
              className="rn-nav-list mt-0"
            >
              {(data?.education || []).length > 0 && (
                <Tab eventKey={`${id}-education`} title="Education">
                  <EducationsArea data={data?.education || []} />
                </Tab>
              )}
              {(data?.skills || []).length > 0 && (
                <Tab eventKey={`${id}-skills`} title="Professional Skills">
                  <SkillsArea data={data?.skills || []} />
                </Tab>
              )}
              {(data?.experience || []).length > 0 && (
                <Tab eventKey={`${id}-experience`} title="Experience">
                  <ExperienceArea data={data?.experience || []} />
                </Tab>
              )}
              {(data?.interests || []).length > 0 && (
                <Tab eventKey={`${id}-interest`} title="Interests">
                  <InterestsArea data={data?.interests || []} />
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeArea
