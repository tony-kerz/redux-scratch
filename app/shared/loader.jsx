import React, {Component} from 'react'

export default class extends Component {
  render() {
    const active = this.props.isActive ? 'active' : ''

    return (
      <div className={`ui dimmer ${active}`}>
        <div className="ui text loader">{this.props.text}</div>
      </div>
    )
  }
}
