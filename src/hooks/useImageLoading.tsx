import { useEffect, useState } from 'react'

const useImageLoading = () => {
  const [isImgLoading, setIsImgLoading] = useState<boolean[]>(Array(6).fill(true))
  const [isAllImgLoaded, setIsAllImgLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (isImgLoading.every((item) => item === false)) setIsAllImgLoaded(true)
  }, [isImgLoading])

  return { setIsImgLoading, isAllImgLoaded, setIsAllImgLoaded }
}

export default useImageLoading
