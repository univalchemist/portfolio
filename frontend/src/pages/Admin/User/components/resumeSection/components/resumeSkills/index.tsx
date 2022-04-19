/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Octagon } from 'react-feather'

import { SkillInput } from '@graphql/graphql'
import { moveElInArray } from '@utils/index'
import { Button, DragDrop } from '@components/index'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'

import SkillItem from './skillItem'
import SkillModal from './skillModal'

interface Props {
  data: SkillInput[]
  onChange: (v: SkillInput[]) => void
  onCancel: () => void
}

const ResumeSkill: React.FC<Props> = ({ data, onChange, onCancel }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillInput | undefined>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedSkill(undefined)
  }, [])

  const onSelectSkill = useCallback((e: SkillInput) => {
    setSelectedSkill(e)
    setShowModal(true)
  }, [])

  const onRemoveSkill = useCallback(
    (index: number) => {
      onChange([...data].filter(uc => uc.index !== index))
      setChanged(true)
    },
    [onChange, data],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _skill: SkillInput[] = moveElInArray(
        // @ts-ignore
        data,
        sourceIndex,
        destIndex,
      ) as SkillInput[]

      onChange(_skill)
      setChanged(true)
    },
    [onChange, data],
  )

  const onEdited = useCallback(
    (v: SkillInput) => {
      const _skill = [...data].filter(e => e.index !== v.index)

      onChange([..._skill, v])
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

  const skill = useMemo(() => {
    return data.sort((a, b) => (a.index > b.index ? 1 : -1))
  }, [data])

  return (
    <div className="row">
      <div className="col-12">
        <Accordion.Item eventKey="skill">
          <Accordion.Header>
            <Octagon />
            <span className="ml-4 accordion-title">Skill</span>
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
                dragClassName="row skill-row resume-item-row py-3"
                data={skill}
                isDraggable={Boolean(data.length)}
                renderDragHandler={handleProps => (
                  <DragHandler {...handleProps} />
                )}
                renderItem={item => (
                  <SkillItem
                    data={item}
                    onEdit={onSelectSkill}
                    onDelete={onRemoveSkill}
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
        <SkillModal
          show
          lastIndex={lastIndex}
          data={selectedSkill}
          onSave={onEdited}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default ResumeSkill
