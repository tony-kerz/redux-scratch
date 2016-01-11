//import debug from 'debug'
import React, {Component} from 'react'
import moment from 'moment'

//const dbg = debug('app:shared:griddle:date')

export default class extends Component {
  render() {
    //dbg('props=%o', this.props)
    return (
      <span>{moment(this.props.data).format('YYYY-MM-DD')}</span>
    )
  }
}
