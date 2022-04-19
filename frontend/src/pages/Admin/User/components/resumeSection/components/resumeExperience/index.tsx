/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Layers } from 'react-feather'

import { ExperienceInput } from '@graphql/graphql'
import { moveElInArray } from '@utils/index'
import { Button, DragDrop } from '@components/index'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'

import ExperienceItem from './experienceItem'
import ExperienceModal from './experienceModal'

interface Props {
  data: ExperienceInput[]
  onChange: (v: ExperienceInput[]) => void
  onCancel: () => void
}

const ResumeExperience: React.FC<Props> = ({ data, onChange, onCancel }) => {
  const [selectedExperience, setSelectedExperience] = useState<
    ExperienceInput | undefined
  >()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedExperience(undefined)
  }, [])

  const onSelectExperience = useCallback((e: ExperienceInput) => {
    setSelectedExperience(e)
    setShowModal(true)
  }, [])

  const onRemoveExperience = useCallback(
    (index: number) => {
      onChange([...data].filter(uc => uc.index !== index))
      setChanged(true)
    },
    [onChange, data],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _experience: ExperienceInput[] = moveElInArray(
        // @ts-ignore
        data,
        sourceIndex,
        destIndex,
      ) as ExperienceInput[]

      onChange(_experience)
      setChanged(true)
    },
    [onChange, data],
  )

  const onEdited = useCallback(
    (v: ExperienceInput) => {
      const _experience = [...data].filter(e => e.index !== v.index)

      onChange([..._experience, v])
      setChanged(true)
      onCloseModal()
    },
    [data, onChange, onCloseModal],
  )

  const onCancelEdit = useCallback(() => {
    onCancel()
    setChanged(false)
  }, [onCancel])

  const lastIndex = useMemo(() => {
    if (!data?.length) return -1

    const sorted = data.sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? -1 : 1,
    )

    return sorted[0].index
  }, [data])

  const experience = useMemo(() => {
    return data.sort((a, b) => (a.index > b.index ? 1 : -1))
  }, [data])

  return (
    <div className="row">
      <div className="col-12">
        <Accordion.Item eventKey="experience">
          <Accordion.Header>
            <Layers />
            <span className="ml-4 accordion-title">Experience</span>
          </Accordion.Header>
          <Accordion.Body className="px-4">
            <div className="row">
              <AddButton
                justifyContent="end"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="row">
              <DragDrop
                dropClassName="col-12 py-4"
                dragClassName="row experience-row resume-item-row py-3"
                data={experience}
                isDraggable={Boolean(data.length)}
                renderDragHandler={handleProps => (
                  <DragHandler {...handleProps} />
                )}
                renderItem={item => (
                  <ExperienceItem
                    data={item}
                    onEdit={onSelectExperience}
                    onDelete={onRemoveExperience}
                  />
                )}
                onDragEnd={onChangeIndex}
              />
            </div>
            <div className="row">
              <div className="col-lg-12 mt-5 d-flex align-items-center justify-content-end">
                <Button
                  type="button"
                  disabled={!changed}
                  onClick={onCancelEdit}
                >
                  <span>Cancel edit</span>
                </Button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </div>
      {showModal && (
        <ExperienceModal
          show
          lastIndex={lastIndex}
          data={selectedExperience}
          onSave={onEdited}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default ResumeExperience
