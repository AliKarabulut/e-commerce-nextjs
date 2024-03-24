'use client'
import Image from 'next/image'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SwiperProps = {
  slides: {
    id: string
    description: string
    imageId: string
    image: {
      id: string
      urls: string[]
      main: boolean
      optionId: string | null
      sliderId: string | null
    }
  }[]
}

const HomeSwiper = ({ slides }: SwiperProps) => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      className="home-swiper-wrapper">
      {slides?.map((slide, index) => (
        <SwiperSlide key={index} className="h-full">
          <div className="home-swiper-container">
            <div className="home-swiper-description" dangerouslySetInnerHTML={{ __html: slide.description }} />
            <div className="home-swiper-image-wrapper">
              {slide.image.urls[0] && (
                <Image src={slide.image.urls[0]} alt={`Slide image ${index}`} width={520} height={380} className="home-swiper-image" />
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSwiper
