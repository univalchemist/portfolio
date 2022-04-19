import React, { useMemo } from 'react'
import { groupBy } from 'lodash'

import { ContentTitle, ProgressBar } from '@components/index'

import { Skill } from '@graphql/graphql'
import './styles.scss'

interface Props {
  data: Skill[]
}

const SkillsArea: React.FC<Props> = ({ data }) => {
  const skills: { [x: string]: Skill[] } = useMemo(() => {
    const grouped: { [x: string]: Skill[] } = groupBy(
      data || [],
      (d: Skill) => d.category,
    )

    const _skills: { [x: string]: Skill[] } = {}
    Object.entries(grouped).forEach(([k, v]) => {
      _skills[k] = v.sort((_v1: Skill, _v2: Skill) =>
        _v1.index > _v2.index ? 1 : -1,
      )
    })

    return _skills
  }, [data])

  return (
    <div className="personal-experience-inner">
      <div className="w-100 d-flex flex-column flex-lg-row">
        {Object.entries(skills).map(([category, _skills]) => (
          <div className="progress-wrapper px-3 pb-4 mt--40" key={category}>
            <div className="content">
              <ContentTitle title={category} />

              {_skills.map((_skill: Skill) => (
                <ProgressBar
                  key={`skill-${_skill.index}`}
                  title={_skill.name}
                  titleClassName="mb-0"
                  value={Math.min((_skill.rate || 0) * 10, 100)}
                  label={`${_skill.rate || 0}/10`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsArea
