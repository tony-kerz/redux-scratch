import debug from 'debug'
import React, {Component} from 'react'
import _ from 'lodash'

const dbg = debug('app:shared:table')

export default class Table extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {columnMeta, rows, className} = this.props
    const metaKeys = _.keys(columnMeta)
    //const metaVals = _.values(columnMeta)

    return (
      <table className={className}>
        <thead>
          <tr>
            {metaKeys.map((metaKey, i) => {return <th key={i}>{metaKey}</th>})}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                {metaKeys.map((metaKey, j) => {return <td className={metaKey} key={j}>{this.getValue(row, columnMeta[metaKey])}</td>})}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  getValue(row, metaVal) {
    if (_.isFunction(metaVal)) {
      return metaVal(row)
    } else if (_.isString(metaVal)) {
      return _.get(row, metaVal)
    }
    else {
      throw `unexpected metaVal=${metaVal}`
    }
  }
}
