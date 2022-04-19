/* eslint-disable no-unused-vars */
import React, { useContext, useMemo } from 'react'

import { DropDown } from '@components/index'
import { User, AdminType } from '@graphql/graphql'
import { ISelectOption } from '@root/types'
import { fullName } from '@utils/index'
import { AppContext } from '@root/AppContext'

interface Props {
  selected?: ISelectOption
  data: Partial<User>[]
  onSelect: (o: ISelectOption) => void
}

const UserSelector: React.FC<Props> = ({ selected, data, onSelect }) => {
  const { admin: currentAdmin } = useContext(AppContext)

  const options = useMemo(() => {
    const res =
      currentAdmin?.type === AdminType.SuperAdmin
        ? [{ label: 'All', value: '' }]
        : []

    data.forEach(({ firstName, middleName, lastName, id }) => {
      res.push({
        label: fullName({ firstName, middleName, lastName }),
        value: id || '',
      })
    })

    return res
  }, [currentAdmin?.type, data])

  return (
    <div className="users-select-container mb-3 mx-3">
      <DropDown
        id="user"
        placeholder="Select user"
        selected={selected}
        options={options}
        onSelect={onSelect}
      />
    </div>
  )
}

export default React.memo(UserSelector)
