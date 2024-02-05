export const PrevArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="prev" aria-label="이전">
      <svg className="custom-0" viewBox="0 0 10 40" width="40px" height="40px">
        <path
          fill="#444"
          d="M9.476.09c.452.226.65.805.44 1.295L1.985 20l7.933 18.615c.208.49.011 1.07-.44 1.295-.452.226-.987.012-1.196-.477L0 20 8.281.567c.209-.49.744-.703 1.195-.477Z"
        ></path>
      </svg>
    </button>
  )
}

export const NextArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="next" aria-label="다음">
      <svg className="custom-0" viewBox="0 0 10 40" width="40px" height="40px">
        <path
          fill="#444"
          fillRule="evenodd"
          d="M.524.09c-.452.226-.65.805-.44 1.295L8.015 20 .083 38.615c-.208.49-.011 1.07.44 1.295.452.226.987.012 1.196-.477L10 20 1.719.567C1.51.077.975-.136.524.09Z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  )
}

export const carouselSettings = {
  infinite: true,
  dots: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 834,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  ],
  nextArrow: <NextArrow onClick={() => null} />,
  prevArrow: <PrevArrow onClick={() => null} />
}
