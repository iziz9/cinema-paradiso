export const PrevArrow = ({ onClick }: { onClick: any }) => {
  return (
    <button onClick={onClick} className="prev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 16 16"
        version="1.1"
      >
        <path fill="#444" d="M12 13h-2l-5-5 5-5h2l-5 5z" />
      </svg>
    </button>
  )
}

export const NextArrow = ({ onClick }: { onClick: any }) => {
  return (
    <button onClick={onClick} className="next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 16 16"
        version="1.1"
      >
        <path fill="#444" d="M4 13h2l5-5-5-5h-2l5 5z" />
      </svg>
    </button>
  )
}

export const carouselSettings = {
  infinite: true,
  dots: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  swipeToSlide: true, //모바일 테스트
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 834,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 4
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false
      }
    }
  ],
  nextArrow: <NextArrow onClick={() => null} />,
  prevArrow: <PrevArrow onClick={() => null} />
}
