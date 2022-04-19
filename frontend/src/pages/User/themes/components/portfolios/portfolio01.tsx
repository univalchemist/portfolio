/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'

import ImagePlaceholder from '@assets/images/img_placeholder.png'
import { ProfilePortfolio } from '@root/types'
import { Anchor, Icon, TechStacks } from '@components/index'
import PortfolioModal from './portfolioModal'

interface Props {
  data: ProfilePortfolio
  onView: (id: string) => void
  onLike: (id: string) => void
}

const PortfolioCard: React.FC<Props> = ({ data, onView, onLike }) => {
  const [show, setShow] = useState<boolean>(false)

  const onViewPortfolio = useCallback(() => {
    onView(data.id)
    setShow(true)
  }, [data.id, onView])

  return (
    <>
      <div
        className="rn-portfolio w-100"
        onClick={onViewPortfolio}
        role="button"
        tabIndex={-1}
      >
        <div className="inner">
          <div className="thumbnail">
            <Anchor path="#!">
              <img
                src={data.images[0]?.url || ImagePlaceholder}
                alt="portfolio image"
              />
            </Anchor>
          </div>
          <div className="content">
            <div className="category-info">
              <div className="category-list">
                <Anchor path="#!">{data.category}</Anchor>
              </div>
              <div className="meta">
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
            </div>
            <h4 className="title">
              <Anchor path="#!">
                {data.title}
                <Icon name="arrow-up-right" />
              </Anchor>
            </h4>
            <TechStacks techStacks={data.techStacks || []} />
          </div>
        </div>
      </div>
      <PortfolioModal
        show={show}
        data={data}
        onClose={() => setShow(false)}
        onLike={() => onLike(data.id)}
      />
    </>
  )
}

export default PortfolioCard
