import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'
import actions from '../patients/actions'
import PatientQueryForm from '../patients/patient-query-form'
import Griddle from 'griddle-react'
import DateCol from '../shared/griddle/date'
import Pager from '../shared/griddle/pager'
import ApiHelper from '../api/helper'
import {getPageKey} from '../shared/page/utils'
import constants from '../patients/constants'

const dbg = debug('app:griddle')

const pageKey = getPageKey(constants.ALT_PAGE_KEY)

const columnMeta = [
  {
    columnName: 'fullName',
    displayName: 'full name',
    cssClassName: 'full-name'
  },
  {
    columnName: 'dateOfBirth',
    displayName: 'birthdate',
    cssClassName: 'birthdate',
    customComponent: DateCol
  },
  {
    columnName: 'gender',
    displayName: 'gen',
    sortable: false
  },
  {
    columnName: 'mrn'
  },
  {
    columnName: 'phoneNumber',
    displayName: 'phone',
    cssClassName: 'phone'
  },
  {
    columnName: 'address',
    cssClassName: 'address'
  },
  {
    columnName: 'city',
    cssClassName: 'city'
  },
  {
    columnName: 'state',
    cssClassName: 'state'
  },
  {
    columnName: 'zip'
  }
]

// https://github.com/GriddleGriddle/Griddle/issues/114#issuecomment-86429892
const columns = _.map(columnMeta, 'columnName')

@connect(
  state => {
    dbg('connect: state=%o', state)
    return {
      patients: state.patients
    }
  },
  dispatch => {
    dbg('connect: actions=%o', actions)
    return bindActionCreators(actions, dispatch)
  }
)
export default class extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {query, data, total, active} = this.props.patients[pageKey]
    const {limit, offset, sort} = query
    const totalPages = Math.ceil(total / limit)
    const currentPage = Math.floor(offset / limit)
    dbg('render: totalPages=%o, currentPage=%o', totalPages, currentPage)

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Patients</h3>
        </div>
        <div className="panel-body">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Patient Search</h3>
            </div>
            <div className="panel-body">
              <PatientQueryForm filterPatients={filter => this.props.filter(pageKey, filter)} />
            </div>
          </div>
          {data &&
            <div className="panel panel-default patients">
              <Griddle
                useGriddleStyles={false}
                tableClassName="table table-hover"
                columns={columns}
                columnMetadata={columnMeta}
                useExternal={true}
                externalChangeSort={this.changeSort}
                externalSortColumn={ApiHelper.getSortField(sort)}
                externalSortAscending={ApiHelper.isAscending(sort)}
                externalSetPage={this.setPage}
                externalSetFilter={this.setFilter}
                externalSetPageSize={this.setPageSize}
                externalMaxPage={totalPages}
                externalCurrentPage={currentPage}
                useCustomPagerComponent={true}
                customPagerComponent={Pager}
                results={data}
              />
              {active > 0 &&
                <div className="overlay">
                  <i className="fa fa-3x fa-circle-o-notch fa-spin" />
                </div>}
            </div>}
        </div>
      </div>
    )
  }

  changeSort = (field, isAscending) => {
    dbg('change-sort: field=%o, is-ascending=%o', field, isAscending)
    this.props.sort(pageKey, field, isAscending)
  }

  setPage = index => {
    dbg('set-page: index=%o', index)
    this.props.page(pageKey, index)
  }

  setFilter(filter) {
    dbg('set-filter: filter=%o', filter)
  }

  setPageSize(size) {
    dbg('set-page-size: size=%o', size)
  }
}
