import debug from 'debug'
import React, {Component} from 'react'

const dbg = debug('app:gallery')

export default class Gallery extends Component {
  render() {
    dbg('render: props=%o', this.props)

    return(
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Gallery</h3>
        </div>
        <div className='panel-body'>
          <form>
            <div className="form-group">
              <label for="date-1">date</label>
              <input className="form-control" id="date-1" placeholder="date" data-provide="datepicker"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
