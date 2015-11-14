import debug from 'debug'
import React, {Component} from 'react'
import $ from 'jquery'
import 'semantic-ui-css/components/dropdown'

let dbg = debug('app:home')

class Home extends Component {
  render() {
    return(
      <div className='field'>
        <h3 className="ui top attached header">
          Home
        </h3>
        <div className="ui attached segment">
          <h4 className="ui header">Mad Skillz</h4>
          <select name="skills" className="ui fluid search dropdown" ref='skills'>
            <option value="">Skills</option>
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
    )
  }

  componentDidMount() {
    dbg('cdm: this.ref.skills=%o', this.refs.skills)
    const skills = $(this.refs.skills)
    dbg('cdm: skills=%o', skills)
    const skillz = $('.ui.dropdown')
    dbg('cdm: skillz=%o', skillz)
    skills.dropdown(
      {
        onChange: (value) => {
          dbg('skills.on-change: value=%o', value)
        }
      }
    )
  }
}

export default Home
