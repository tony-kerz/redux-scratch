import React, {Component} from 'react'
import moment from 'moment'

export default class extends Component {
  render() {
    return <span>{moment(this.props.data).format('YYYY-MM-DD')}</span>
  }
}
