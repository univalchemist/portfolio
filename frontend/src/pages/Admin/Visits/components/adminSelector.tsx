/* eslint-disable no-unused-vars */
import React, { useContext, useMemo } from 'react'

import { DropDown } from '@components/index'
import { AdminType, Admin } from '@graphql/graphql'
import { ISelectOption } from '@root/types'
import { AppContext } from '@root/AppContext'

interface Props {
  selected?: ISelectOption
  data: Admin[]
  onSelect: (o: ISelectOption) => void
}

const AdminSelector: React.FC<Props> = ({ selected, data, onSelect }) => {
  const { admin: currentAdmin } = useContext(AppContext)

  const options = useMemo(() => {
    if (!currentAdmin) return []

    const res = [
      { label: 'All', value: '' },
      { label: currentAdmin.email, value: currentAdmin.id },
    ]

    data.forEach(datum => {
      res.push({ label: datum.email, value: datum.id })
    })

    return res
  }, [currentAdmin, data])

  if (currentAdmin?.type !== AdminType.SuperAdmin) return null

  return (
    <div className="admins-select-container mb-3 mx-3">
      <DropDown
        id="admin"
        placeholder="Select admin"
        selected={selected}
        options={options}
        onSelect={onSelect}
      />
    </div>
  )
}

export default React.memo(AdminSelector)
