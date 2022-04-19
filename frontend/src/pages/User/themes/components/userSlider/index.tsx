import React from 'react'

import { Maybe, Image } from '@graphql/graphql'
import { Slider, SliderItem } from '@components/index'

import './styles.scss'

interface Props {
  images: Maybe<Image[]>
}

const UserSlider: React.FC<Props> = ({ images }) => {
  if (!images?.length) return null

  return (
    <div className="user-slides">
      <Slider options={{ fade: true, autoplay: images.length > 1 }}>
        {images.map((image: Image, index: number) => (
          <SliderItem key={index}>
            <img
              className="user-background"
              src={image.url}
              alt="User background"
            />
          </SliderItem>
        ))}
      </Slider>
    </div>
  )
}

export default UserSlider
