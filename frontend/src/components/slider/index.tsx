import React from 'react'
import SlickSlider, { Settings } from 'react-slick'
import classNames from 'classnames'

import { Children } from '@root/types'

import ArrowButton from './arrowButton'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Props {
  options?: Settings
  children: Children
  prevIcon?: string
  nextIcon?: string
  className?: string
}

const Slider: React.FC<Props> = ({
  options,
  children,
  prevIcon = 'ArrowLeft',
  nextIcon = 'ArrowRight',
  className,
}) => {
  const settings = {
    autoplay: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowButton className="prev-arrow" icon={prevIcon} />,
    nextArrow: <ArrowButton className="next-arrow" icon={nextIcon} />,
    ...options,
  }
  return (
    <SlickSlider className={classNames(className)} {...settings}>
      {children}
    </SlickSlider>
  )
}

export { default as SliderItem } from './sliderItem'

export default Slider
