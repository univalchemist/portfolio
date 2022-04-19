/* eslint-disable no-unused-vars */
import React from 'react'

import { PortfolioInput, Maybe } from '@graphql/graphql'
import { ConfirmButton, Icon } from '@components/index'

import ImagePlaceholder from '@assets/images/img_placeholder.png'

interface Props {
  data: PortfolioInput
  onSelect: (p: PortfolioInput) => void
  onDelete: (index: number, id: Maybe<string>) => void
  deleting: boolean
}

const UserPortfolio: React.FC<Props> = ({
  data,
  onSelect,
  onDelete,
  deleting,
}) => {
  return (
    <div className="col-12">
      <div
        className="d-flex flex-column flex-md-row py-3 portfolio-item"
        onClick={() => onSelect(data)}
      >
        <div className="image-container">
          <img
            src={data.images?.[0]?.url || ImagePlaceholder}
            className="image"
            alt="Image"
          />
        </div>
        <div className="d-flex flex-column align-items-between justify-content-start flex-1 px-4 info-row">
          <span className="title w-100 text-left mb-1 color-lightn">
            <span className="category">{data.category} | </span>
            {data.title}
          </span>
          <span className="description w-100 text-left">
            {data.description}
          </span>
        </div>
        <div className="d-flex flex-row flex-md-column align-items-between justify-content-between">
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <Icon
                name="eye"
                size={13}
                color={data.view ? 'red' : undefined}
                strokeWidth={3}
                className="ml-2"
              />
              {` ${data.view}`}
            </span>
            <span className="ml-2">
              <Icon
                name="heart"
                size={13}
                color={data.like ? 'red' : undefined}
                strokeWidth={3}
                className="ml-2"
              />
              {` ${data.like}`}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <ConfirmButton
              className="portfolio-action-button"
              iconClassName="action-icon"
              iconName="trash-2"
              iconSize={14}
              variant="danger"
              loading={deleting}
              onClick={() => onDelete(data.index, data.id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPortfolio
