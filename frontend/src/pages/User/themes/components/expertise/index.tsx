import React, { useCallback } from 'react'
import {
  DiNodejsSmall,
  DiPhp,
  DiPython,
  DiLaravel,
  DiRuby,
  DiReact,
  DiAndroid,
} from 'react-icons/di'
import {
  SiNestjs,
  SiRubyonrails,
  SiNextdotjs,
  SiGraphql,
  SiTailwindcss,
  SiCsharp,
  SiSolidity,
  SiBlockchaindotcom,
  SiDjango,
  SiVuedotjs,
  SiNuxtdotjs,
  SiAngularjs,
  SiIos,
  SiCsswizardry,
} from 'react-icons/si'

import { Skill } from '@graphql/graphql'
import { getInitials } from '@utils/index'

import './styles.scss'

interface Props {
  expertise: Skill[]
}

const Expertise: React.FC<Props> = ({ expertise }) => {
  const getIcon = useCallback((ex: Skill) => {
    const name = ex.name.replace(/ /g, '').toLowerCase()
    const size = 22
    const color = '#FFFFFF'

    if (name.startsWith('node')) {
      return <DiNodejsSmall size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('nest')) {
      return <SiNestjs size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('rubyonrails')) {
      return <SiRubyonrails size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('ruby')) {
      return <DiRuby size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('php')) {
      return <DiPhp size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('python')) {
      return <DiPython size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('django')) {
      return <SiDjango size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('laravel')) {
      return <DiLaravel size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('react')) {
      return <DiReact size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('next')) {
      return <SiNextdotjs size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('vue')) {
      return <SiVuedotjs size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('nuxt')) {
      return <SiNuxtdotjs size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('angular')) {
      return <SiAngularjs size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('tailwindcss')) {
      return <SiTailwindcss size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('c#')) {
      return <SiCsharp size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('graphql')) {
      return <SiGraphql size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('solidity')) {
      return <SiSolidity size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('blockchain')) {
      return <SiBlockchaindotcom size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('android')) {
      return <DiAndroid size={size} color={color} title={ex.name} />
    }
    if (name.startsWith('ios')) {
      return <SiIos size={size} color={color} title={ex.name} />
    }
    if (name.includes('css')) {
      return <SiCsswizardry size={size} color={color} title={ex.name} />
    }

    return getInitials(ex.name)
  }, [])

  if (!expertise.length) return null

  return (
    <div className="mt-3 py-4 px-3 user-expertise">
      <div className="pb-3 expertise-title">My expertise</div>
      {expertise.map((ex: Skill, index: number) => (
        <div
          key={index}
          className="mx-2 mb-4 user-skill-icon icon-dark"
          title={ex.name}
        >
          {getIcon(ex)}
        </div>
      ))}
    </div>
  )
}

export default Expertise
