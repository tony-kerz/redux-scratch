import debug from 'debug'
import React, {Component} from 'react'
import _ from 'lodash'

const dbg = debug('app:shared:table')

export default class Table extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {columnMeta, rows, className} = this.props
    const metaKeys = _.keys(columnMeta)
    // const metaVals = _.values(columnMeta)

    return (
      <table className={className}>
        <thead>
          <tr>
            {metaKeys.map((metaKey, i) => {
              return <th key={i}>{metaKey}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                {metaKeys.map((metaKey, j) => {
                  return (
                    <td key={j} className={_.kebabCase(metaKey)}>{this.getValue(row, metaKey, columnMeta[metaKey])}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  getValue(row, metaKey, metaVal) {
    if (_.isFunction(metaVal)) {
      return metaVal(row, metaKey)
    } else if (_.isString(metaVal)) {
      return _.get(row, metaVal)
    } else if (metaVal === true) {
      return row[metaKey]
    }
    throw new TypeError(`unexpected metaVal=${metaVal}`)
  }
}
