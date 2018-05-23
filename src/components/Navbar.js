import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="nav-bar">
        <h1>OfficePool</h1>
        <Menu style={{margin: 0}}>
          <Menu.Item
            style={{width: '7.5vw', color: '#FF8C00', background: '#181818', borderRadiusRight: 2}}
            name='NFL'
            active={activeItem === 'NFL'}
            onClick={this.handleItemClick}
          >
            NFL
          </Menu.Item>

          <Menu.Item
            style={{width: '7.5vw', color: '#FF8C00', background: '#181818', borderRadiusRight: 2}}
            name='MLB'
            active={activeItem === 'MLB'}
            onClick={this.handleItemClick}
          >
            MLB
          </Menu.Item>

          <Menu.Item
            style={{width: '7.5vw', color: '#FF8C00', background: '#181818', borderRadiusRight: 2}}
            name='NBA'
            active={activeItem === 'NBA'}
            onClick={this.handleItemClick}
          >
            NBA
          </Menu.Item>
          <Menu.Item
            style={{width: '7.5vw', color: '#FF8C00', background: '#181818', borderRadiusRight: 2}}
            name='MLS'
            active={activeItem === 'MLS'}
            onClick={this.handleItemClick}
          >
            MLS
          </Menu.Item>
          <Menu.Item
            id='nhl'
            style={{width: '7.5vw', color: '#FF8C00', background: '#181818', borderRadiusRight: 2}}
            name='NHL'
            active={activeItem === 'NHL'}
            onClick={this.handleItemClick}
          >
            NHL
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default Navbar
