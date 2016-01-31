import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Waypoint from 'react-waypoint'
import actions from '../patients/actions'
import PatientQueryForm from '../patients/patient-query-form'
import moment from 'moment'

const dbg = debug('app:scroll')

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
export default class Scroll extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {data, active, offset} = this.props.patients

    return(
      <div className='panel panel-default greedy-height scroll'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Scroll</h3>
        </div>
        <div className='panel-body'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>Patient Search</h3>
            </div>
            <div className='panel-body'>
              <PatientQueryForm filterPatients={this.props.filter}/>
            </div>
          </div>
          <div className='panel panel-default scroll-panel'>
            <div className='panel-body greedy-height'>
              { data && (
                <div>
                  {this.renderItems(data)}
                  <Waypoint
                    key={offset}
                    onEnter={this.onEnter}
                    onLeave={this.onLeave}
                    threshold={0.2}
                  />
                </div>
              )}
            </div>
            { (active > 0) && (
              <div className='overlay'>
                <i className='fa fa-3x fa-circle-o-notch fa-spin'></i>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderItems(data) {
    dbg('render-items: data=%o', data)
    return data.map((elt, idx) => {
      //dbg('map: elt=%o, idx=%o', elt, idx)
      const {fullName, dateOfBirth, gender} = elt
      return (
        <div key={idx}>
          <div>
            ({idx + 1}) <a onClick={() => this.props.onClick(fullName)}>{fullName}</a>
          </div>
          <div>
            DOB: {moment(dateOfBirth).format('MM/DD/YYYY')}, Age: {moment().diff(dateOfBirth, 'years')}, Gender: {gender}
          </div>
          <hr/>
        </div>
      )
    })
  }

  onEnter = () => {
    dbg('on-enter: props=%o', this.props)
    const {patients} = this.props
    if (patients.more) {
      this.props.more()
    }
    else {
      dbg('on-enter: offset >= total, no more data to fetch...')
    }
  };

  onLeave() {
    dbg('on-leave')
  }
}
