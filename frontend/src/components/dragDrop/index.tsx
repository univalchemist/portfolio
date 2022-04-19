/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react'
import classNames from 'classnames'
import {
  Droppable,
  Draggable,
  DragDropContext,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd'

import { OnDragEnd } from '@root/types'

import './styles.scss'

interface Props {
  dropClassName?: string
  dragClassName?: string
  data: any[]
  horizontal?: boolean
  isDraggable: boolean
  renderDragHandler: (
    handleProps: DraggableProvidedDragHandleProps | undefined,
  ) => React.ReactNode
  renderItem: (item: any) => React.ReactNode
  onDragEnd: OnDragEnd
  renderExtraItem?: () => React.ReactNode
}

const DragDrop: React.FC<Props> = ({
  dropClassName,
  dragClassName,
  data,
  horizontal = false,
  isDraggable,
  renderDragHandler,
  renderItem,
  onDragEnd,
  renderExtraItem,
}) => {
  // Data has index field in it
  const _onDragEnd = useCallback(
    res => {
      const { destination, source } = res

      if (!destination) return

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      onDragEnd(source.index, destination.index)
    },
    [onDragEnd],
  )

  return (
    <DragDropContext onDragEnd={_onDragEnd}>
      <Droppable
        droppableId="droppable-container"
        direction={horizontal ? 'horizontal' : 'vertical'}
      >
        {(provided, snapshot) => (
          <div
            className={classNames('drop-container', {
              [dropClassName || '']: !!dropClassName,
              'item-dragging': snapshot.isDraggingOver,
            })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.map((datum: any, index: number) => (
              <Draggable
                key={`drag-item-${index}`}
                draggableId={`drag-item-${index}`}
                index={index}
                isDragDisabled={!isDraggable}
              >
                {(provided, snapshot) => (
                  <div
                    className={classNames('drag-container', {
                      [dragClassName || '']: !!dragClassName,
                      dragging: snapshot.isDragging,
                    })}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    {isDraggable && renderDragHandler(provided.dragHandleProps)}
                    {renderItem(datum)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {renderExtraItem && renderExtraItem()}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DragDrop
