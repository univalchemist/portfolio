/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'

import { pascalCase } from '@utils/index'

interface Option {
  onError?: (err: any) => void
}

export const useDynamicIconImport = (name: string, options: Option) => {
  const ImportedIconRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()

  const { onError } = options

  useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        // @ts-ignore
        ImportedIconRef.current = await import(`react-feather`).then(
          icon => icon[pascalCase(name)],
        )
      } catch (err) {
        if (onError) {
          onError(err)
        }
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name, onError])

  return { error, loading, SvgIcon: ImportedIconRef.current }
}
