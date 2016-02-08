// https://github.com/erikras/redux-form/issues/82#issuecomment-172050380
import React, {Component} from 'react'
import Select from 'react-select'
import debug from 'debug'

const dbg = debug('app:shared:select')

export default class extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {value, onBlur, ...props} = this.props

    return (
      <Select
        value={value || ''}
        onBlur={() => onBlur(value)}
        {...props}
      />
    )
  }
}
