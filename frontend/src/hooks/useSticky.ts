import { useEffect, useState } from 'react'

export const useSticky = () => {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      const scrollPos = window.scrollY
      if (scrollPos > 250) {
        setSticky(true)
      }

      if (scrollPos < 250) {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [sticky])

  return sticky
}
