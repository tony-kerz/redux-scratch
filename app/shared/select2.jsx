import React, {Component} from 'react'
import debug from 'debug'
import $ from 'jquery'

const dbg = debug('app:shared:select2')

export default class extends Component {
  state = {
    value: this.props.value
  };

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value})
  }

  onChange = (value) => {
    dbg('on-change: value=%o', value)
  };

  render() {
    dbg('render: props=%o', this.props)
    return (
      <select name={this.props.name} ref='select'>
        {this.props.children}
      </select>
    )
  }

  componentDidMount() {
    dbg('cdm: refs=%o', this.refs)
    const select = $(this.refs.select)
    select.select2(this.props.options)

    select.on('select2:select', (e) => {
      dbg('skills: on-select: e=%o', e)
      const target = $(e.target)
      const text = target.find('option:selected').text()
      dbg('skills: on-select: val=%o, text=%o', target.val(), text)
      this.onChange(target.val())
    })
  }
}
