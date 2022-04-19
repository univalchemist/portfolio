/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Feature,
  Maybe,
  FeatureInput,
  useUpsertFeaturesMutation,
} from '@graphql/graphql'
import { Button, DragDrop } from '@components/index'
import { AppContext } from '@root/AppContext'
import { OnUserUpdated, KeyValue } from '@root/types'
import { moveElInArray } from '@utils/index'

import SectionDescription from '@pages/Admin/User/components/shared/sectionDesc'
import DragHandler from '@pages/Admin/User/components/shared/dragHandler'
import AddButton from '@pages/Admin/User/components/shared/addButton'
import UserFeature from './components/userFeature'

import './styles.scss'

interface Props {
  data: Maybe<Feature[]>
  userId: Maybe<string>
  onUpdate: OnUserUpdated
  onLoading: (loading: boolean) => void
}

const FeaturesSection: React.FC<Props> = ({
  data,
  userId,
  onUpdate,
  onLoading,
}) => {
  const { notifyMessage } = useContext(AppContext)
  const [userFeatures, setUserFeatures] = useState<FeatureInput[]>([])
  const [errors, setErrors] = useState<KeyValue<string>>({})

  const [upsertFeatures, { loading }] = useUpsertFeaturesMutation()

  useEffect(() => {
    onLoading(loading)
  }, [loading, onLoading])

  useEffect(() => {
    const _features: FeatureInput[] = (data || []).map(
      ({ id, userId, index, title, description, icon }) => ({
        id,
        userId,
        index: index || 0,
        title,
        description,
        icon,
      }),
    )
    if (!_features.length) {
      _features.push({
        id: null,
        userId,
        index: 0,
        title: 'Anonymous',
        description: '',
        icon: '',
      })
    }
    setUserFeatures(_features)
  }, [data, userId])

  const validateFeatures = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    userFeatures.forEach((feature: FeatureInput) => {
      if (!feature.title || feature.title === 'Anonymous') {
        _errors[`title_${feature.index}`] = 'Title is required'
        valid = false
      }
    })
    setErrors(_errors)

    return valid
  }, [userFeatures])

  const onAddNewFeature = useCallback(() => {
    const lastLink = userFeatures.sort((a, b) =>
      (a.index || 0) > (b.index || 0) ? -1 : 1,
    )[0]
    setUserFeatures(c => [
      ...c,
      {
        index: (lastLink.index || 0) + 1,
        id: null,
        userId,
        title: 'Anonymous',
        description: '',
        icon: '',
      },
    ])
  }, [userFeatures, userId])

  const onRemoveFeature = useCallback(
    (index: number, id: Maybe<string>) => {
      const _userFeatures = id
        ? [...userFeatures].map(uc => {
            if (uc.index === index) {
              return { ...uc, index: -1 }
            }

            return uc
          })
        : [...userFeatures].filter(uc => uc.index !== index)
      setUserFeatures(_userFeatures)
    },
    [userFeatures],
  )

  const onChangeIndex = useCallback(
    (sourceIndex: number, destIndex: number) => {
      const _features: FeatureInput[] = moveElInArray(
        // @ts-ignore
        userFeatures,
        sourceIndex,
        destIndex,
      ) as FeatureInput[]

      setUserFeatures(_features)
    },
    [userFeatures],
  )

  const onChange = useCallback(
    (index: number, name: string, value: string | number | boolean) => {
      const _features = userFeatures.map((userFeature: FeatureInput) => {
        if (index === userFeature.index) {
          // @ts-ignore
          userFeature[name] = value
        }

        return userFeature
      })

      setUserFeatures(_features)
    },
    [userFeatures],
  )

  const onSubmit = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (!validateFeatures()) {
        return
      }

      upsertFeatures({
        variables: {
          input: userFeatures,
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertFeatures.status ? 'success' : 'error',
            res.upsertFeatures.message,
          )
          if (res.upsertFeatures.status) {
            onUpdate('features', res.upsertFeatures.data)
          }
        },
      })
    },
    [notifyMessage, onUpdate, upsertFeatures, userFeatures, validateFeatures],
  )

  const features = useMemo(() => {
    return userFeatures
      .filter(uf => uf.index !== -1)
      .sort((a, b) => ((a.index || 0) > (b.index || 0) ? 1 : -1))
  }, [userFeatures])

  if (userId && !userFeatures.length) return null

  return (
    <>
      <SectionDescription description="Services that you can provide. (e.g. Web/Mobile app development)" />
      <div className="col-12 form-wrapper form-dark user-features-container">
        <div className="row">
          <DragDrop
            dropClassName="col-12 py-4"
            dragClassName="row feature-row py-3"
            data={features}
            isDraggable={Boolean(features.length)}
            renderDragHandler={handleProps => <DragHandler {...handleProps} />}
            renderItem={item => (
              <UserFeature
                data={item}
                errors={errors}
                onChange={onChange}
                onRemove={onRemoveFeature}
              />
            )}
            onDragEnd={onChangeIndex}
          />
        </div>
        <div className="row">
          <AddButton onClick={onAddNewFeature} />
        </div>
        <div className="row">
          <div className="col-lg-12 mt-5 d-flex justify-content-end">
            <Button type="submit" disabled={loading} onClick={onSubmit}>
              <span>{loading ? 'Saving' : 'Save'}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesSection
