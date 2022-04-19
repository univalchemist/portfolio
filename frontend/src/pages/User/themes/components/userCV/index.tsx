/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useCallback, useState } from 'react'
import { DownloadCloud } from 'react-feather'
import { Spinner } from 'react-bootstrap'
import { groupBy } from 'lodash'

import {
  ExternalLink,
  Education,
  Experience,
  Skill,
  SkillCategory,
  UserLink,
} from '@graphql/graphql'
import { AppUser, CVData } from '@root/types'
import { API_ENDPOINT, AVATAR_DATA_URL } from '@root/constants'
import { fullName } from '@utils/index'

import './styles.scss'

interface Props {
  user: AppUser
  profileUrl?: string
}

const UserCV: React.FC<Props> = ({ user, profileUrl }) => {
  const [downloading, setDownloading] = useState<boolean>(false)

  const onDownload = useCallback(async () => {
    setDownloading(true)

    const { profile, resume } = user
    // const avatarUrl: any = await getAvatarUrl(profile.avatar?.url)

    const userName = fullName({
      firstName: profile.firstName,
      middleName: profile.middleName,
      lastName: profile.lastName,
    })

    const linkedIn: UserLink | undefined = profile.links.find(
      l => l.name === ExternalLink.LinkedIn,
    )
    const interests: string[] | undefined = resume?.interests.length
      ? resume?.interests.map(interest => interest.title)
      : undefined

    const education: (Education & { duration: string })[] | undefined = resume
      ?.education.length
      ? resume.education.map(e => ({
          ...e,
          duration: `${e.startedFrom} - ${e.endedAt ? e.endedAt : 'Now'}`,
        }))
      : undefined

    const experience: (Experience & { duration: string })[] | undefined = resume
      ?.experience.length
      ? resume.experience.map(e => ({
          ...e,
          duration: `${e.startedFrom} - ${e.endedAt ? e.endedAt : 'Now'}`,
        }))
      : undefined

    const _skills = groupBy(resume?.skills || [], s => s.category)
    const skills: { category: SkillCategory; data: Skill[] }[] = Object.entries(
      _skills,
    ).map(([category, data]) => ({
      category: category as SkillCategory,
      data: data.map(d => ({ ...d, rate: 10 * d.rate })),
    }))

    const data: CVData = {
      avatar: profile.avatar?.url || AVATAR_DATA_URL,
      userName,
      profileUrl: profileUrl || '',
      slogan: profile.slogan,
      title: profile.title,
      bio: profile.bio,
      phone: profile.phone,
      email: profile.email,
      address: profile.address,
      linkedin: linkedIn?.url,
      interests,
      education,
      experience,
      skills: skills.length ? skills : undefined,
    }

    fetch(`${API_ENDPOINT}/cv/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${userName}.pdf`)

        // Append to html link element page
        document.body.appendChild(link)

        // Start download
        link.click()

        // Clean up and remove the link
        link.parentNode?.removeChild(link)
      })
      .finally(() => {
        setDownloading(false)
      })
  }, [user, profileUrl])

  return (
    <div className="user-csv-button dark" title="Download CV">
      <button onClick={onDownload} disabled={downloading}>
        {downloading ? (
          <Spinner animation="grow" variant="light" />
        ) : (
          <DownloadCloud />
        )}
        <span>CV</span>
      </button>
    </div>
  )
}

export default UserCV
