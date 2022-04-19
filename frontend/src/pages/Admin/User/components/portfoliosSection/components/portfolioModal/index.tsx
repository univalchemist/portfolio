/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Modal from 'react-bootstrap/Modal'
import { X } from 'react-feather'

import {
  PortfolioInput,
  PortfolioCategory,
  Maybe,
  Image,
  Uploads,
  useUpsertPortfoliosMutation,
} from '@graphql/graphql'
import { KeyValue } from '@root/types'
import { AppContext } from '@root/AppContext'
import {
  FormGroup,
  FormError,
  Input,
  Label,
  Button,
  Select,
  Textarea,
} from '@components/index'

import PortfolioImages from '../portfolioImages'

interface Props {
  show: boolean
  userId: Maybe<string>
  lastIndex: number
  data: Maybe<PortfolioInput>
  refetch: () => void
  onClose: () => void
}

const PortfolioModal: React.FC<Props> = ({
  show,
  userId,
  lastIndex,
  data,
  refetch,
  onClose,
}) => {
  const { notifyMessage } = useContext(AppContext)
  const [userPortfolio, setUserPortfolio] = useState<PortfolioInput>(
    {} as PortfolioInput,
  )
  const [techStacks, setTechStacks] = useState<string>('')
  const [errors, setErrors] = useState<KeyValue<string>>({})
  const [defaultImages, setDefaultImages] = useState<Image[]>([])
  const [images, setImages] = useState<Uploads[]>([])

  const [upsertPortfolios, { loading }] = useUpsertPortfoliosMutation()

  useEffect(() => {
    if (!show) {
      setErrors({})
      setUserPortfolio({} as PortfolioInput)
      setDefaultImages([])
      setImages([])
    }
  }, [show])

  useEffect(() => {
    if (data) {
      setUserPortfolio(data)
    } else {
      const _portfolio: PortfolioInput = {
        id: null,
        userId: userId || '',
        index: lastIndex + 1,
        title: '',
        description: '',
        category: PortfolioCategory.Web,
        techStacks: [],
        images: [],
        like: 0,
        view: 0,
      }

      setUserPortfolio(_portfolio)
    }

    setTechStacks((data?.techStacks || []).join(', '))
  }, [data, lastIndex, userId])

  useEffect(() => {
    setDefaultImages(data?.images || [])
  }, [data?.images])

  const onChange = useCallback(
    (name: string, value: string | number | PortfolioCategory) => {
      const _error: KeyValue<string> = {}
      if (['title', 'description', 'techStacks'].includes(name)) {
        if (value) {
          _error[name] = ''
        } else {
          _error[name] = 'This field is required'
        }
      } else if (name === 'view' || name === 'like') {
        if (isNaN(+value)) {
          _error[name] = 'Invalid value'
        } else {
          _error[name] = +value < 0 ? 'Invalid value' : ''
        }
      }

      if (name === 'techStacks') {
        setTechStacks(value as string)
      } else {
        setUserPortfolio(p => ({ ...p, [name]: value }))
      }

      setErrors(e => ({ ...e, ..._error }))
    },
    [],
  )

  const onChangeImages = useCallback((df: Image[], nf: Uploads[]) => {
    setDefaultImages(df)
    setImages(nf)
  }, [])

  const validate = useCallback(() => {
    const _errors: KeyValue<string> = {}
    let valid = true

    const strFields: Partial<keyof PortfolioInput>[] = ['title', 'description']
    const numFields: Partial<keyof PortfolioInput>[] = ['view', 'like']

    strFields.forEach(field => {
      if (!userPortfolio[field]) {
        _errors[field] = 'This field is required'
        valid = false
      }
    })
    if (!techStacks) {
      _errors.techStacks = 'This field is required'
      valid = false
    }
    numFields.forEach(field => {
      if (isNaN(+(userPortfolio[field] || ''))) {
        _errors[field] = 'Invalid value'
        valid = false
      } else if (+(userPortfolio[field] || '') < 0) {
        _errors[field] = 'Invalid value'
        valid = false
      }
    })
    setErrors(_errors)

    return valid
  }, [techStacks, userPortfolio])

  const onSubmit = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!validate()) return

      const _portfolio: PortfolioInput = {
        ...userPortfolio,
        techStacks: techStacks.replaceAll(', ', ',').split(','),
        view: +(userPortfolio.view || 0),
        like: +(userPortfolio.like || 0),
        images: defaultImages,
        newImages: images,
      }
      upsertPortfolios({
        variables: {
          input: [_portfolio],
        },
        onCompleted: res => {
          notifyMessage(
            res.upsertPortfolios.status ? 'success' : 'error',
            res.upsertPortfolios.message,
          )
          onClose()
          refetch()
        },
      })
    },
    [
      defaultImages,
      images,
      notifyMessage,
      onClose,
      refetch,
      techStacks,
      upsertPortfolios,
      userPortfolio,
      validate,
    ],
  )

  const categories = useMemo(
    () =>
      Object.entries(PortfolioCategory).map(([k, v]) => ({
        label: k,
        value: v,
      })),
    [],
  )

  const submittingDisabled = useMemo(() => {
    if (loading) return true
    return Object.values(errors).some(v => !!v)
  }, [errors, loading])

  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="h6">
          {userPortfolio?.id ? 'Update portfolio' : 'Create portfolio'}
        </Modal.Title>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <span aria-hidden="true">
            <X />
          </span>
        </button>
      </Modal.Header>
      <Modal.Body className="portfolio-form-modal">
        <div className="form-wrapper form-dark no-shadow py-0 px-3">
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="title">
                  Title
                  <sup className="required">*</sup>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={userPortfolio?.title || ''}
                  placeholder=""
                  type="text"
                  onChange={(e: any) => onChange('title', e.target.value)}
                  size="lg"
                />

                {!!errors.title && <FormError>{errors.title}</FormError>}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="description">
                  Description
                  <sup className="required">*</sup>
                </Label>
                <Textarea
                  id="description"
                  size="lg"
                  name="description"
                  value={userPortfolio?.description || ''}
                  placeholder="Description"
                  type="textarea"
                  rows={3}
                  onChange={(e: any) => onChange('description', e.target.value)}
                />

                {!!errors.description && (
                  <FormError>{errors.description}</FormError>
                )}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-12">
              <FormGroup>
                <Label htmlFor="category">
                  Category
                  <sup className="required">*</sup>
                </Label>
                <Select
                  id="category"
                  name="category"
                  value={userPortfolio?.category || PortfolioCategory.Web}
                  options={categories}
                  onChange={(e: any) => onChange('category', e.target.value)}
                  size="lg"
                />
              </FormGroup>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <FormGroup>
                <Label htmlFor="view">Views</Label>
                <Input
                  id="view"
                  name="view"
                  value={
                    userPortfolio?.view !== undefined ? userPortfolio?.view : ''
                  }
                  placeholder=""
                  type="text"
                  onChange={(e: any) => onChange('view', e.target.value)}
                  size="lg"
                />
                {!!errors.view && <FormError>{errors.view}</FormError>}
              </FormGroup>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <FormGroup>
                <Label htmlFor="like">Likes</Label>
                <Input
                  id="like"
                  name="like"
                  value={
                    userPortfolio?.like !== undefined ? userPortfolio?.like : ''
                  }
                  placeholder=""
                  type="text"
                  onChange={(e: any) => onChange('like', e.target.value)}
                  size="lg"
                />
                {!!errors.like && <FormError>{errors.like}</FormError>}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="techStacks">
                  Tech-stacks
                  <sup className="required">*</sup>
                </Label>
                <Textarea
                  id="techStacks"
                  size="lg"
                  name="techStacks"
                  value={techStacks}
                  placeholder="Technical skills"
                  type="textarea"
                  rows={3}
                  onChange={(e: any) => onChange('techStacks', e.target.value)}
                />

                {!!errors.techStacks && (
                  <FormError>{errors.techStacks}</FormError>
                )}
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Label htmlFor="images">
                Images (4:3)
                <small> (The first image will be cover image)</small>
              </Label>
            </div>
            <PortfolioImages
              defaultImages={defaultImages}
              images={images}
              onChange={onChangeImages}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-lg-12 mt-5 d-flex justify-content-end">
            <Button
              type="submit"
              disabled={submittingDisabled}
              onClick={onSubmit}
            >
              <span>{loading ? 'Saving' : 'Save'}</span>
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default PortfolioModal
