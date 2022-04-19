/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Portfolio,
  Maybe,
  PortfolioInput,
  useUpsertPortfoliosMutation,
  useDeletePortfolioMutation,
} from '@graphql/graphql'
import { Button, DragDrop } from '@components/index'
import { AppContext } from '@root/AppContext'
import { OnUserUpdated } from '@root/types'
import { moveElInArray } from '@utils/index'

import SectionDescription from '@pages/Admin/User/components/shared/sectionDesc'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'

import UserPortfolio from './components/userPortfolio'
import PortfolioModal from './components/portfolioModal'

import './styles.scss'

interface Props {
  data: Maybe<Portfolio[]>
  userId: Maybe<string>
  refetch: () => void
  onUpdate: OnUserUpdated
  onLoading: (loading: boolean) => void
}

const PortfoliosSection: React.FC<Props> = ({
  data,
  userId,
  refetch,
  onUpdate,
  onLoading,
}) => {
  const { notifyMessage } = useContext(AppContext)
  const [userPortfolios, setUserPortfolios] = useState<PortfolioInput[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    PortfolioInput | undefined
  >()
  const [showModal, setShowModal] = useState<boolean>(false)

  const [upsertPortfolios, { loading }] = useUpsertPortfoliosMutation()
  const [deletePortfolio, { loading: deletingPortfolio }] =
    useDeletePortfolioMutation()

  useEffect(() => {
    onLoading(loading)
  }, [onLoading, loading])

  useEffect(() => {
    const _portfolios: PortfolioInput[] = (data || []).map(
      ({
        id,
        userId,
        index,
        title,
        description,
        category,
        techStacks,
        images,
        like,
        view,
      }) => ({
        id,
        userId,
        index: index || 0,
        title,
        description,
        category,
        techStacks,
        images,
        like,
        view,
      }),
    )
    setUserPortfolios(_portfolios)
  }, [data, userId])

  const onCloseModal = useCallback(() => {
    setShowModal(false)
    setSelectedPortfolio(undefined)
  }, [])

  const onSelectPortfolio = useCallback((p: PortfolioInput) => {
    setSelectedPortfolio(p)
    setShowModal(true)
  }, [])

  const onRemovePortfolio = useCallback(
    (index: number, id: Maybe<string>) => {
      if (id) {
        deletePortfolio({
          variables: {
            id,
          },
          onCompleted: res => {
            if (res?.deletePortfolio.status) {
              refetch()
            }
          },
        })
      } else {
        setUserPortfolios([...userPortfolios].filter(uc => uc.index !== index))
      }
    },
    [deletePortfolio, refetch, userPortfolios],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _portfolios: PortfolioInput[] = moveElInArray(
        // @ts-ignore
        userPortfolios,
        sourceIndex,
        destIndex,
      ) as PortfolioInput[]

      setUserPortfolios(_portfolios)
    },
    [userPortfolios],
  )

  const onSubmit = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      upsertPortfolios({
        variables: {
          input: userPortfolios,
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertPortfolios.status ? 'success' : 'error',
            res.upsertPortfolios.message,
          )
          if (res.upsertPortfolios.status) {
            onUpdate('portfolios', res.upsertPortfolios.data)
          }
        },
      })
    },
    [notifyMessage, onUpdate, upsertPortfolios, userPortfolios],
  )

  const portfolios = useMemo(() => {
    return userPortfolios
      .filter(uf => uf.index !== -1)
      .sort((a, b) => ((a.index || 0) > (b.index || 0) ? 1 : -1))
  }, [userPortfolios])

  const lastIndex = useMemo(() => {
    if (!userPortfolios?.length) return -1

    const sorted = userPortfolios.sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? -1 : 1,
    )

    return sorted[0].index
  }, [userPortfolios])

  return (
    <>
      <SectionDescription description="Past experience/projects you had worked on" />
      <div className="col-12 user-portfolios-container">
        <div className="row">
          <AddButton justifyContent="end" onClick={() => setShowModal(true)} />
        </div>
        <div className="row">
          <DragDrop
            dropClassName="col-12 py-4"
            dragClassName="row portfolio-row py-3"
            data={portfolios}
            isDraggable={Boolean(portfolios.length)}
            renderDragHandler={handleProps => <DragHandler {...handleProps} />}
            renderItem={item => (
              <UserPortfolio
                data={item}
                onSelect={onSelectPortfolio}
                onDelete={onRemovePortfolio}
                deleting={deletingPortfolio}
              />
            )}
            onDragEnd={onChangeIndex}
          />
        </div>
        {Boolean(userPortfolios.length) && (
          <div className="row">
            <div className="col-lg-12 mt-5 d-flex justify-content-end">
              <Button type="submit" disabled={loading} onClick={onSubmit}>
                <span>{loading ? 'Saving' : 'Save'}</span>
              </Button>
            </div>
          </div>
        )}
        {showModal && (
          <PortfolioModal
            show
            userId={userId}
            lastIndex={lastIndex}
            data={selectedPortfolio}
            refetch={refetch}
            onClose={onCloseModal}
          />
        )}
      </div>
    </>
  )
}

export default PortfoliosSection
