/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Bookmark } from 'react-feather'

import { InterestInput } from '@graphql/graphql'
import { moveElInArray } from '@utils/index'
import { Button, DragDrop } from '@components/index'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'

import InterestItem from './interestItem'
import InterestModal from './interestModal'

interface Props {
  data: InterestInput[]
  onChange: (v: InterestInput[]) => void
  onCancel: () => void
}

const ResumeInterest: React.FC<Props> = ({ data, onChange, onCancel }) => {
  const [selectedInterest, setSelectedInterest] = useState<
    InterestInput | undefined
  >()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedInterest(undefined)
  }, [])

  const onSelectInterest = useCallback((e: InterestInput) => {
    setSelectedInterest(e)
    setShowModal(true)
  }, [])

  const onRemoveInterest = useCallback(
    (index: number) => {
      onChange([...data].filter(uc => uc.index !== index))
      setChanged(true)
    },
    [onChange, data],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _interest: InterestInput[] = moveElInArray(
        // @ts-ignore
        data,
        sourceIndex,
        destIndex,
      ) as InterestInput[]

      onChange(_interest)
      setChanged(true)
    },
    [onChange, data],
  )

  const onEdited = useCallback(
    (v: InterestInput) => {
      const _interest = [...data].filter(e => e.index !== v.index)

      onChange([..._interest, v])
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

  const interest = useMemo(() => {
    return data.sort((a, b) => (a.index > b.index ? 1 : -1))
  }, [data])

  return (
    <div className="row">
      <div className="col-12">
        <Accordion.Item eventKey="interest">
          <Accordion.Header>
            <Bookmark />
            <span className="ml-4 accordion-title">Interest</span>
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
                dragClassName="row interest-row resume-item-row py-3"
                data={interest}
                isDraggable={Boolean(data.length)}
                renderDragHandler={handleProps => (
                  <DragHandler {...handleProps} />
                )}
                renderItem={item => (
                  <InterestItem
                    data={item}
                    onEdit={onSelectInterest}
                    onDelete={onRemoveInterest}
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
        <InterestModal
          show
          lastIndex={lastIndex}
          data={selectedInterest}
          onSave={onEdited}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default ResumeInterest
