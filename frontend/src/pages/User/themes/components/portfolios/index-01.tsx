import React, { useCallback, useContext } from 'react'

import {
  useIncreasePortfolioViewsMutation,
  useIncreasePortfolioLikesMutation,
} from '@graphql/graphql'
import { ProfilePortfolio } from '@root/types'
import { SectionTitle } from '@components/index'
import { updatePortfolioNum } from '@utils/index'
import { AppContext } from '@root/AppContext'
import PortfolioCard from './portfolio01'

interface Props {
  id?: string
  data: ProfilePortfolio[]
}

const PortfoliosArea: React.FC<Props> = ({ data, id = 'portfolio' }) => {
  const { user, onSetUser } = useContext(AppContext)
  const [increaseView] = useIncreasePortfolioViewsMutation()
  const [increaseLike] = useIncreasePortfolioLikesMutation()

  const onView = useCallback(
    (id: string) => {
      increaseView({
        variables: { id },
        onCompleted: res => {
          if (res?.increasePortfolioViews?.data) {
            const newPortfolios: ProfilePortfolio[] = updatePortfolioNum(
              user.portfolios,
              res.increasePortfolioViews.data,
            )

            onSetUser({ portfolios: newPortfolios })
          }
        },
      })
    },
    [increaseView, onSetUser, user.portfolios],
  )

  const onLike = useCallback(
    (id: string) => {
      increaseLike({
        variables: { id },
        onCompleted: res => {
          if (res?.increasePortfolioLikes?.data) {
            const newPortfolios: ProfilePortfolio[] = updatePortfolioNum(
              user.portfolios,
              res.increasePortfolioLikes.data,
            )
            onSetUser({ portfolios: newPortfolios })
          }
        },
      })
    },
    [increaseLike, onSetUser, user.portfolios],
  )

  if (!data.length) return null

  return (
    <div className="rn-portfolio-area rn-section-gap section-separator" id={id}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle align="center" title="My Portfolio" subtitle="" />
          </div>
        </div>

        <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
          {data.map((datum: ProfilePortfolio) => (
            <div
              key={datum.id}
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-once="true"
              className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30"
            >
              <PortfolioCard data={datum} onView={onView} onLike={onLike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfoliosArea
