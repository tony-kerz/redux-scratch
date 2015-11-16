import debug from 'debug'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import $ from 'jquery'
import 'semantic-ui-css/components/dropdown'
import {connect} from 'react-redux'
import * as actions from './actions'
import Loader from '../shared/loader'
import Table from '../shared/table'
//import {articleFields} from '../api/new-york-times'
import moment from 'moment'

const dbg = debug('app:home')

const articleColMeta = {
  headline: (row) => { return <a href={row.web_url}>{row.headline.main}</a> },
    section: 'section_name',
    date: (row) => { return moment(row.pub_date).format('YYYY-MM-DD') },
    snippet: 'snippet'
  }

  @connect(
    (state) => {
      dbg('connect: state=%o', state)
      return {
        skill: state.skill
      }
    },
    (dispatch) => {
      dbg('connect: actions=%o', actions)
      return bindActionCreators(actions, dispatch)
    }
  )
  export default class Home extends Component {
    render() {
      dbg('render: props=%o', this.props)
      const {name, loading, info} = this.props.skill

      return(
        <div className='ui segment'>
          <div className='ui segments raised'>
            <h3 className='ui segment header'>
              Home
            </h3>
            <div className='ui segment secondary'>
              <h4 className='ui header'>Mad Skillz</h4>
              <select name='skills' className='ui fluid search dropdown' ref='skills'>
                <option value=''>Skills</option>
                <option value='angular'>Angular</option>
                <option value='css'>CSS</option>
                <option value='design'>Graphic Design</option>
                <option value='ember'>Ember</option>
                <option value='html'>HTML</option>
                <option value='ia'>Information Architecture</option>
                <option value='javascript'>Javascript</option>
                <option value='mech'>Mechanical Engineering</option>
                <option value='meteor'>Meteor</option>
                <option value='node'>NodeJS</option>
                <option value='plumbing'>Plumbing</option>
                <option value='python'>Python</option>
                <option value='rails'>Rails</option>
                <option value='react'>React</option>
                <option value='repair'>Kitchen Repair</option>
                <option value='ruby'>Ruby</option>
                <option value='ui'>UI Design</option>
                <option value='ux'>User Experience</option>
              </select>
            </div>
          </div>
          { info && (
            <div className='ui segment raised secondary'>
              <Table className='ui table violet articles' columnMeta={articleColMeta} rows={info}/>
            </div>
          )}
          <Loader text={`loading articles for ${name}`} isActive={loading}/>
        </div>
      )
    }

    componentDidMount() {
      dbg('cdm: this.ref.skills=%o', this.refs.skills)

      $(this.refs.skills).dropdown(
        {
          onChange: (value, text) => {
            dbg('skills.on-change: value=%o, text=%o', value, text)
            this.props.setSkill(text)
          }
        }
      )
    }
  }
