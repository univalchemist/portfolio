/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Accordion from 'react-bootstrap/Accordion'

import {
  Resume,
  Maybe,
  ResumeInput,
  EducationInput,
  ExperienceInput,
  InterestInput,
  SkillInput,
  useUpsertResumeMutation,
  useDeleteResumeMutation,
} from '@graphql/graphql'
import { OnUserUpdated } from '@root/types'
import { AppContext } from '@root/AppContext'
import { ConfirmButton, Divider, FormGroup, Input } from '@components/index'

import ResumeEducation from './components/resumeEducation'
import ResumeExperience from './components/resumeExperience'
import ResumeSkills from './components/resumeSkills'
import ResumeInterests from './components/resumeInterests'

import './styles.scss'

interface Props {
  data: Maybe<Resume>
  userId: Maybe<string>
  refetch: () => void
  onUpdate: OnUserUpdated
  onLoading: (loading: boolean) => void
}

type ResumeChangeKey = 'education' | 'experience' | 'skills' | 'interests'
type ResumeChangeValue =
  | EducationInput[]
  | ExperienceInput[]
  | InterestInput[]
  | SkillInput[]

const ResumeSection: React.FC<Props> = ({
  data,
  userId,
  refetch,
  onUpdate,
  onLoading,
}) => {
  const { notifyMessage } = useContext(AppContext)
  const [userResume, setUserResume] = useState<ResumeInput>({} as ResumeInput)

  const [upsertResume, { loading: upsertingResume }] = useUpsertResumeMutation()
  const [deleteResume, { loading: deletingResume }] = useDeleteResumeMutation()

  useEffect(() => {
    onLoading(upsertingResume || deletingResume)
  }, [onLoading, upsertingResume, deletingResume])

  useEffect(() => {
    const { id, description, education, skills, experience, interests } =
      data || {}
    setUserResume({
      id,
      userId: userId || '',
      description: description || '',
      education: education || [],
      skills: skills || [],
      experience: experience || [],
      interests: interests || [],
    })
  }, [data, userId])

  const onSave = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      upsertResume({
        variables: {
          input: userResume,
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertResume.status ? 'success' : 'error',
            res.upsertResume.message,
          )
          if (res.upsertResume.status) {
            onUpdate('resume', res.upsertResume.data)
          }
        },
      })
    },
    [notifyMessage, onUpdate, upsertResume, userResume],
  )

  const onRemoveResume = useCallback(() => {
    if (data?.id) {
      deleteResume({
        variables: {
          id: data?.id,
        },
        onCompleted: res => {
          notifyMessage(
            res.deleteResume.status ? 'success' : 'error',
            res.deleteResume.message,
          )
          if (res?.deleteResume.status) {
            refetch()
          }
        },
      })
    }
  }, [data?.id, deleteResume, notifyMessage, refetch])

  const onChange = useCallback(
    (key: ResumeChangeKey, value: ResumeChangeValue) => {
      setUserResume(ur => ({ ...ur, [key]: value }))
    },
    [],
  )

  const onCancel = useCallback(
    (key: ResumeChangeKey) => {
      setUserResume(ur => ({
        ...ur,
        [key]: data?.[key] || [],
      }))
    },
    [data],
  )

  const canSave = useMemo(() => {
    const { description, education, skills, experience, interests } = userResume
    if (description) return true

    return Boolean(
      education?.length ||
        skills?.length ||
        experience?.length ||
        interests?.length,
    )
  }, [userResume])

  return (
    <div className="col-12 user-resume-container">
      <div className="form-wrapper form-dark no-shadow py-0 px-3">
        <div className="row">
          <div className="col-12">
            <FormGroup>
              <Input
                id="description"
                name="description"
                value={userResume?.description || ''}
                placeholder="Description (how many years of experience, etc)"
                type="text"
                onChange={(e: any) =>
                  setUserResume(ur => ({ ...ur, description: e.target.value }))
                }
                size="lg"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Accordion defaultActiveKey="education">
              <ResumeEducation
                data={userResume.education || []}
                onChange={(v: EducationInput[]) => onChange('education', v)}
                onCancel={() => onCancel('education')}
              />
              <ResumeExperience
                data={userResume.experience || []}
                onChange={(v: ExperienceInput[]) => onChange('experience', v)}
                onCancel={() => onCancel('experience')}
              />
              <ResumeSkills
                data={userResume.skills || []}
                onChange={(v: SkillInput[]) => onChange('skills', v)}
                onCancel={() => onCancel('skills')}
              />
              <ResumeInterests
                data={userResume.interests || []}
                onChange={(v: InterestInput[]) => onChange('interests', v)}
                onCancel={() => onCancel('interests')}
              />
            </Accordion>
          </div>
        </div>
        <Divider className="my-5" />
        <div className="row">
          <div className="col-lg-12 mt-5 d-flex align-items-center justify-content-end">
            {Boolean(data?.id) && (
              <ConfirmButton
                className="resume-action-button"
                textClassName="resume-button-text"
                text="Delete"
                variant="danger"
                loading={deletingResume}
                onClick={onRemoveResume}
              />
            )}
            {canSave && (
              <ConfirmButton
                className="ml-4 resume-action-button"
                textClassName="resume-button-text"
                text="Save"
                variant="success"
                wait={false}
                loading={upsertingResume}
                onClick={onSave}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeSection
