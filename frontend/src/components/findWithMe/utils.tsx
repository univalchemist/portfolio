import {
  FaAngellist,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  SiUpwork,
  SiIndeed,
  SiFiverr,
  SiFreelancer,
  SiTopcoder,
} from 'react-icons/si'

import GuruIcon from '@assets/images/icons/guru.com.svg'
import GunIcon from '@assets/images/icons/gun.io.svg'
import PPHIcon from '@assets/images/icons/pph.com.svg'
import { ExternalLink } from '@graphql/graphql'

export const getLinkIcon = (linkName: ExternalLink, size: number) => {
  const color = '#FFFFFF'
  switch (linkName) {
    case ExternalLink.Angel:
      return <FaAngellist size={size} color={color} title={linkName} />
    case ExternalLink.Facebook:
      return <FaFacebookF size={size} color={color} title={linkName} />
    case ExternalLink.Fiverr:
      return <SiFiverr size={size} color={color} title={linkName} />
    case ExternalLink.Freelancer:
      return <SiFreelancer size={size} color={color} title={linkName} />
    case ExternalLink.Github:
      return <FaGithub size={size} color={color} title={linkName} />
    case ExternalLink.Gun:
      return (
        <img src={GunIcon} className="gun-io" alt="Gun.io" title={linkName} />
      )

    case ExternalLink.Guru:
      return (
        <img
          src={GuruIcon}
          className="guru-com"
          alt="guru.com"
          title={linkName}
        />
      )
    case ExternalLink.PeoplePerHour:
      return (
        <img
          src={PPHIcon}
          className="peopleperhour-com"
          alt="peopleperhour.com"
          title={linkName}
        />
      )
    case ExternalLink.Indeed:
      return <SiIndeed size={size} color={color} title={linkName} />
    case ExternalLink.LinkedIn:
      return <FaLinkedinIn size={size} color={color} title={linkName} />
    case ExternalLink.TopCoder:
      return <SiTopcoder size={size} color={color} title={linkName} />
    case ExternalLink.Twitter:
      return <FaTwitter size={size} color={color} title={linkName} />
    case ExternalLink.Upwork:
      return <SiUpwork size={size} color={color} title={linkName} />
    default:
      return <FiArrowUpRight size={size} color={color} title={linkName} />
  }
}
