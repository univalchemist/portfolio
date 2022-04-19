import React, { useCallback, useMemo, useRef } from 'react'

import { generateUrl } from '@utils/index'
import { ConfirmButton } from '@components/index'
import { SITE_URL } from '@root/constants'

interface Props {
  slug: string | undefined
  links: string[]
  platforms: string[]
  themes: string[]
  contactable: boolean
}

const SharableLink: React.FC<Props> = ({
  slug,
  links,
  platforms,
  themes,
  contactable,
}) => {
  const linkRef = useRef<HTMLInputElement>(null)

  const sharableLink = useMemo(() => {
    if (!slug) return

    const platform = platforms[0]
    const concatenation = SITE_URL.endsWith('/') ? '' : '/'
    let sLink = `${SITE_URL}${concatenation}${slug}~`
    sLink += generateUrl(links)

    sLink += `/${platform[0].toLowerCase()}${platform.length}`
    sLink += `${themes.toString()}`
    sLink += contactable ? 't' : 'f'

    return sLink
  }, [contactable, slug, links, platforms, themes])

  const onCopy = useCallback(() => {
    if (linkRef.current && navigator.clipboard && window.isSecureContext) {
      linkRef.current.select()
      linkRef.current.setSelectionRange(0, 99999)

      // navigator clipboard api method'
      navigator.clipboard.writeText(linkRef.current.value)
    }
  }, [])

  if (!sharableLink) return null

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="px-3 py-2 position-relative sharable-link">
          <a href={sharableLink} target="_blank">
            {sharableLink}
          </a>
          <input
            ref={linkRef}
            type="text"
            className="link-value"
            value={sharableLink}
            onChange={() => null}
          />
          <div className="copy-button">
            <ConfirmButton
              className="link-action-button"
              iconClassName="action-icon"
              iconName="copy"
              iconSize={14}
              variant="primary"
              wait={false}
              onClick={onCopy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharableLink
