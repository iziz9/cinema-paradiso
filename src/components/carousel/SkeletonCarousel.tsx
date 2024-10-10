import Slider from 'react-slick'
import { carouselSettings } from './CarouselSettings'
import SkeletonPoster from '../common/SkeletonPoster'

const SkeletonCarousel = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Slider {...carouselSettings}>
      <SkeletonPoster />
      <SkeletonPoster />
      <SkeletonPoster />
      <SkeletonPoster />
      <SkeletonPoster />
      <SkeletonPoster />
    </Slider>
  )
}

export default SkeletonCarousel
