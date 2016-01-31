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
      // <Select
      //   name={this.props.field.name}
      //   value={this.props.value}
      //   options={this.props.options}
      //   onChange={::this.onChange}
      //   onBlur={() => this.props.field.onBlur(this.props.field.value)}
      //   placeholder={this.props.placeholder}
      //   noResultsText={this.state.noResultsText}
      //   disabled={this.props.submitting}
      // />
    )
  }
}
