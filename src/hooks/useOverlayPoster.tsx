import React, { useCallback, useState } from 'react'
import OverlayPoster from '../components/layout/OverlayPoster'

const useOverlayPoster = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const handleMouseOver = useCallback(() => {
    setIsHovering(true)
  }, [])
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return { isHovering, setIsHovering, handleMouseLeave, handleMouseOver }
}

export default useOverlayPoster
