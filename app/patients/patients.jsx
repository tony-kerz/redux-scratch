import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import Table from '../shared/table'
import moment from 'moment'
import PatientQueryForm from './patient-query-form'

const dbg = debug('app:patients')

const patientColMeta = {
  'full name': 'fullName',
  'birthdate': (row) => { return moment(row.dateOfBirth).format('YYYY-MM-DD') },
  'gen': 'gender',
  mrn: true,
  phone: 'phoneNumber',
  address: true,
  city: true,
  state: true,
  zip: true
}

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
export default class Patients extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {data} = this.props.patients

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
              <Table className='table table-hover' columnMeta={patientColMeta} rows={data}/>
            </div>
          )}
        </div>
      </div>
    )
  }
}
