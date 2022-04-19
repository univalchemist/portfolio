import React from 'react'
import Nav from 'react-bootstrap/Nav'

import { Sticky } from '@components/index'
import { ITab } from '@root/types'

interface Props {
  tabs: ITab[]
}

const UserTabs: React.FC<Props> = ({ tabs }) => {
  return (
    <div className="col-lg-3">
      <div className="d-flex flex-wrap align-content-start h-100">
        <Sticky className="w-100" top="75px">
          <Nav
            variant="pills"
            className="tab-navigation-button flex-row flex-md-column flex-wrap"
          >
            {tabs.map((tab: ITab) => (
              <Nav.Item key={tab.id}>
                <Nav.Link eventKey={tab.id}>{tab.name}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Sticky>
      </div>
    </div>
  )
}

export default UserTabs
