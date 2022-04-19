/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

import { ISelectOption, IButtonVariant } from '@root/types'

import './styles.scss'

interface Props {
  id?: string
  className?: string
  disabled?: boolean
  placeholder?: string
  selected?: ISelectOption
  buttonVariant?: IButtonVariant
  options: ISelectOption[]
  onSelect: (o: ISelectOption) => void
}

const DropDown: React.FC<Props> = ({
  id,
  className,
  disabled = false,
  selected,
  placeholder,
  buttonVariant = 'primary',
  options,
  onSelect,
}) => {
  return (
    <div className={classNames('drop-down-container', className)}>
      <DropdownButton
        as={ButtonGroup}
        variant={buttonVariant}
        title={selected?.label || placeholder || ''}
        disabled={disabled}
      >
        {options.map(option => (
          <Dropdown.Item
            key={`${id}-${option.value}`}
            eventKey={option.value}
            onClick={() => onSelect(option)}
            active={option.value === selected?.value}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  )
}

export default DropDown
