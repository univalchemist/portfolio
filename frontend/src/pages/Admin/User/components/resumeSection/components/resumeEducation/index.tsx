/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { BookOpen } from 'react-feather'

import { EducationInput } from '@graphql/graphql'
import { moveElInArray } from '@utils/index'
import { Button, DragDrop } from '@components/index'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'

import EducationItem from './educationItem'
import EducationModal from './educationModal'

interface Props {
  data: EducationInput[]
  onChange: (v: EducationInput[]) => void
  onCancel: () => void
}

const ResumeEducation: React.FC<Props> = ({ data, onChange, onCancel }) => {
  const [selectedEducation, setSelectedEducation] = useState<
    EducationInput | undefined
  >()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedEducation(undefined)
  }, [])

  const onSelectEducation = useCallback((e: EducationInput) => {
    setSelectedEducation(e)
    setShowModal(true)
  }, [])

  const onRemoveEducation = useCallback(
    (index: number) => {
      onChange([...data].filter(uc => uc.index !== index))
      setChanged(true)
    },
    [onChange, data],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _education: EducationInput[] = moveElInArray(
        // @ts-ignore
        data,
        sourceIndex,
        destIndex,
      ) as EducationInput[]

      onChange(_education)
      setChanged(true)
    },
    [onChange, data],
  )

  const onEdited = useCallback(
    (v: EducationInput) => {
      const _education = [...data].filter(e => e.index !== v.index)

      onChange([..._education, v])
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

  const education = useMemo(() => {
    return data.sort((a, b) => (a.index > b.index ? 1 : -1))
  }, [data])

  return (
    <div className="row">
      <div className="col-12">
        <Accordion.Item eventKey="education">
          <Accordion.Header>
            <BookOpen />
            <span className="ml-4 accordion-title">Education</span>
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
                dragClassName="row education-row resume-item-row py-3"
                data={education}
                isDraggable={Boolean(data.length)}
                renderDragHandler={handleProps => (
                  <DragHandler {...handleProps} />
                )}
                renderItem={item => (
                  <EducationItem
                    data={item}
                    onEdit={onSelectEducation}
                    onDelete={onRemoveEducation}
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
        <EducationModal
          show
          lastIndex={lastIndex}
          data={selectedEducation}
          onSave={onEdited}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default ResumeEducation
