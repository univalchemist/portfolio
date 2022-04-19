import { useState } from 'react'

export const useOffCanvas = () => {
  const [offCanvas, setOffCanvas] = useState(false)

  const offCanvasHandler = () => {
    setOffCanvas(prev => !prev)
  }

  return { offCanvas, offCanvasHandler, setOffCanvas }
}
