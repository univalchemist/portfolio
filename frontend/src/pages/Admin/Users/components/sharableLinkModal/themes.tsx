/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'

import ImgTheme1 from '@assets/images/themes/theme1.png'
import { IThemes } from '@root/types'

interface Props {
  name: string
  value: string[]
  title: string
  description: string
  onChange: (name: string, value: string) => void
}

const themeImages = {
  [IThemes.Default]: ImgTheme1,
}

const Themes: React.FC<Props> = ({
  name,
  value,
  title,
  description,
  onChange,
}) => {
  return (
    <div className="row mb-2 links-row">
      <div className="col-12">
        <div className="link-label">{title}</div>
        <div className="link-description mb-4">{description}</div>
        <div className="w-100 ml-2 d-flex align-items-center flex-wrap">
          {Object.entries(IThemes).map(([k, v]) => (
            <div key={k} className="theme-item-container">
              <div
                className={classNames(
                  'px-2 mb-2 d-flex align-items-center position-relative theme-item',
                  value.includes(v) && 'theme-selected',
                )}
                onClick={() => onChange(name, v)}
              >
                <img src={themeImages[v as IThemes]} alt={k} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Themes
