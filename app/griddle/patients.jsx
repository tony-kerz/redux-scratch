import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../patients/actions'
import _ from 'lodash'
import PatientQueryForm from '../patients/patient-query-form'
import Griddle from 'griddle-react'
import DateCol from '../shared/griddle/date'
import Pager from '../shared/griddle/pager'

const dbg = debug('app:griddle')

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
const columns = _.pluck(columnMeta, 'columnName')

@connect(
  (state) => {
    dbg('connect: state=%o', state)
    return {
      patients: state.patients
    }
  },
  (dispatch) => {
    dbg('connect: actions=%o', actions)
    return bindActionCreators(actions, dispatch)
  }
)
export default class extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {data, sort, total, limit, offset} = this.props.patients
    const totalPages = Math.ceil(total/limit)
    const currentPage = offset/limit
    dbg('render: totalPages=%o, currentPage=%o', totalPages, currentPage)

    return(
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Patients</h3>
        </div>
        <div className='panel-body'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>Patient Search</h3>
            </div>
            <div className='panel-body'>
              <PatientQueryForm filterPatients={this.props.filterPatients}/>
            </div>
          </div>
          { data && (
            <div className='panel panel-default patients'>
              <Griddle
                useGriddleStyles={false}
                tableClassName='table table-hover'
                columns={columns}
                columnMetadata={columnMeta}
                useExternal={true}
                externalChangeSort={this.changeSort}
                externalSortColumn={sort.field}
                externalSortAscending={sort.isAscending}
                externalSetPage={this.setPage}
                externalSetFilter={this.setFilter}
                externalSetPageSize={this.setPageSize}
                externalMaxPage={totalPages}
                externalCurrentPage={currentPage}
                useCustomPagerComponent={true}
                customPagerComponent={Pager}
                results={data}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  changeSort = (field, isAscending) => {
    dbg('change-sort: field=%o, is-ascending=%o', field, isAscending)
    this.props.sortPatients(field, isAscending)
  };

  setPage = (index) => {
    dbg('set-page: index=%o', index)
    this.props.pagePatients(index)
  };

  setFilter(filter) {
    dbg('set-filter: filter=%o', filter)
  }

  setPageSize(size) {
    dbg('set-page-size: size=%o', size)
  }
}
