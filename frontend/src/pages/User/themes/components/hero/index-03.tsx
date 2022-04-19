import React from 'react'
import classNames from 'classnames'
import Particles from 'react-tsparticles'

import { Button, Skeleton } from '@components/index'
import { ProfileUser } from '@root/types'

import AvatarPlaceholder from '@assets/images/avatar-placeholder.jpeg'

import UserSlider from '../userSlider'

interface Props {
  id?: string
  data: ProfileUser | undefined
  contactable?: boolean
}

const HeroArea: React.FC<Props> = ({ data, contactable, id = 'home' }) => {
  return (
    <section
      id={id}
      className="slider-style-5 rn-section-gap pt--75 pb--50 align-items-center with-particles"
    >
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ['#fff'],
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 4,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 800,
                size: 40,
                duration: 2,
                opacity: 8,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          config_demo: {
            hide_card: false,
            background_color: '#b61924',
            background_image: '',
            background_position: '50% 50%',
            background_repeat: 'no-repeat',
            background_size: 'cover',
          },
        }}
      />
      <UserSlider images={data?.backgroundImages} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-inner">
              <div className="thumbnail gradient-border gradient-animation">
                <img
                  src={data?.avatar?.url || AvatarPlaceholder}
                  className="gradient-border hero-avatar"
                  alt="user avatar"
                />
              </div>

              {data?.title ? (
                <h1>{data?.title}</h1>
              ) : (
                <Skeleton wrapperClassName="sk-center" className="sk-md" />
              )}

              {data?.bio ? (
                <span className="cd-headline clip is-full-width">
                  <span
                    className={classNames('py-3 mt-3', {
                      'with-background': Boolean(data?.backgroundImages.length),
                    })}
                  >
                    {data?.bio}
                  </span>
                </span>
              ) : (
                <>
                  <Skeleton
                    wrapperClassName="mt-3 sk-center"
                    className="sk-sm"
                  />
                  <Skeleton wrapperClassName="sk-center" className="sk-md" />
                  <Skeleton wrapperClassName="sk-center" className="sk-md" />
                </>
              )}

              {contactable && (
                <div className="button-area">
                  <Button key={id} path="#contacts">
                    <span>CONTACT ME</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HeroArea.defaultProps = {
  id: 'home',
}

export default HeroArea
