import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Waypoint from 'react-waypoint'
import moment from 'moment'
import actions from '../patients/actions'
import constants from '../patients/constants'
import PatientQueryForm from '../patients/patient-query-form.jsx'
import {getPageKey} from '../shared/page/utils'

const dbg = debug('app:scroll')

const pageKey = getPageKey(constants.ALT_PAGE_KEY)

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
export default class Scroll extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {data, active, offset} = this.props.patients[pageKey]

    return (
      <div className="panel panel-default greedy-height scroll">
        <div className="panel-heading">
          <h3 className="panel-title">Scroll</h3>
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
          <div className="panel panel-default scroll-panel">
            <div className="panel-body greedy-height">
              {data &&
                <div>
                  {this.renderItems(data)}
                  <Waypoint key={offset} onEnter={this.handleEnter} onLeave={this.handleLeave} threshold={0.2} />
                </div>}
            </div>
            {active > 0 &&
              <div className="overlay">
                <i className="fa fa-3x fa-circle-o-notch fa-spin" />
              </div>}
          </div>
        </div>
      </div>
    )
  }

  renderItems(data) {
    dbg('render-items: data=%o', data)
    return data.map((elt, idx) => {
      // dbg('map: elt=%o, idx=%o', elt, idx)
      return (
        <div key={elt.mrn}>
          <div>
            ({idx + 1}) {elt.fullName}
          </div>
          <div>
            DOB: {moment(elt.dateOfBirth).format('MM/DD/YYYY')}, Age: {moment().diff(elt.dateOfBirth, 'years')}, Gender:{' '}
            {elt.gender}
          </div>
          <hr />
        </div>
      )
    })
  }

  handleEnter = () => {
    dbg('handle-enter: props=%o', this.props)
    const {more} = this.props.patients[pageKey]
    if (more) {
      this.props.more(pageKey)
    } else {
      dbg('on-enter: offset >= total, no more data to fetch...')
    }
  }

  handleLeave() {
    dbg('handle-leave')
  }
}
