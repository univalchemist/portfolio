import React, { useCallback, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Form } from 'react-bootstrap'

import { Visit, useDeleteVisitsMutation } from '@graphql/graphql'
import { ConfirmButton } from '@components/index'
import { UTCToLocalTime } from '@utils/index'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

interface Props {
  data: Visit[]
  onDeleted: () => void
}

const VisitsTable: React.FC<Props> = ({ data, onDeleted }) => {
  const [selected, setSelected] = useState<string[]>([])

  const [deleteVisits, { loading }] = useDeleteVisitsMutation()

  const onSelect = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter(d => d !== id))
      } else {
        setSelected([...selected, id])
      }
    },
    [selected],
  )

  const onDelete = useCallback(() => {
    const variables = selected.length ? { ids: selected } : {}

    deleteVisits({
      variables,
      onCompleted: () => {
        onDeleted()
      },
    })
  }, [deleteVisits, onDeleted, selected])

  return (
    <div className="col-12">
      <div className="w-100 d-flex justify-content-end delete-button-container">
        <ConfirmButton
          className="visit-action-button"
          textClassName="visit-button-text"
          text={selected.length ? `Delete - ${selected.length}` : 'Delete all'}
          variant="danger"
          loading={loading}
          onClick={onDelete}
        />
      </div>
      <Table className="visits-table-container">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>
              <div className="header-label">User</div>
            </Th>
            <Th>
              <div className="header-label">Platform</div>
            </Th>
            <Th>
              <div className="header-label">User agent</div>
            </Th>
            <Th>
              <div className="header-label">Date</div>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, userSeen, from, userAgent, createdAt }: Visit) => (
            <Tr key={id} onClick={() => onSelect(id)}>
              <Td>
                <div className="check-visit">
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label=""
                      checked={selected.includes(id)}
                      onChange={() => onSelect(id)}
                    />
                  </Form.Group>
                </div>
              </Td>
              <Td>
                <div className="header-value">{userSeen}</div>
              </Td>
              <Td>
                <div className="header-value">{from}</div>
              </Td>
              <Td>
                <div className="header-value">{userAgent}</div>
              </Td>
              <Td>
                <div className="header-value text-right">
                  {UTCToLocalTime(createdAt, 'MMM D, HH:mm')}
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default VisitsTable
