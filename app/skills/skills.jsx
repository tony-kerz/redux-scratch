import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import $ from 'jquery'
import moment from 'moment'
import {connect} from 'react-redux'
import Table from '../shared/table.jsx'
import * as actions from './actions'

const dbg = debug('app:skills')

const articleColMeta = {
  headline: row => {
    return <a href={row.web_url}>{row.headline.main}</a>
  },
  section: 'section_name',
  date: row => {
    return moment(row.pub_date).format('YYYY-MM-DD')
  },
  snippet: 'snippet'
}

@connect(
  state => {
    dbg('connect: state=%o', state)
    return {
      skill: state.skill
    }
  },
  dispatch => {
    dbg('connect: actions=%o', actions)
    return bindActionCreators(actions, dispatch)
  }
)
export default class Skills extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {loading, info} = this.props.skill

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Skills</h3>
        </div>
        <div className="panel-body">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Mad Skillz Article Search</h3>
            </div>
            <div className="panel-body">
              <select ref="skills" disabled={loading}>
                <option value="angular">Angular</option>
                <option value="css">CSS</option>
                <option value="design">Graphic Design</option>
                <option value="ember">Ember</option>
                <option value="html">HTML</option>
                <option value="ia">Information Architecture</option>
                <option value="javascript">Javascript</option>
                <option value="mech">Mechanical Engineering</option>
                <option value="meteor">Meteor</option>
                <option value="node">NodeJS</option>
                <option value="plumbing">Plumbing</option>
                <option value="python">Python</option>
                <option value="rails">Rails</option>
                <option value="react">React</option>
                <option value="repair">Kitchen Repair</option>
                <option value="ruby">Ruby</option>
                <option value="ui">UI Design</option>
                <option value="ux">User Experience</option>
              </select>
            </div>
          </div>
          {loading && <i className="fa fa-spinner fa-2x fa-spin" />}
          {info &&
            <div className="panel panel-default articles">
              <Table className="table table-hover" columnMeta={articleColMeta} rows={info} />
            </div>}
        </div>
      </div>
    )
  }

  componentDidMount() {
    dbg('cdm: refs=%o', this.refs)
    const skills = $(this.refs.skills)
    skills.select2({
      placeholder: 'what skillz u haz?',
      allowClear: true
    })

    skills.on('select2:select', e => {
      dbg('skills: on-select: e=%o', e)
      const target = $(e.target)
      const text = target.find('option:selected').text()
      dbg('skills: on-select: val=%o, text=%o', target.val(), text)
      this.props.setSkill(text)
    })
  }
}
