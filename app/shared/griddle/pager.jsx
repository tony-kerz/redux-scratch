import debug from 'debug'
import React, {Component} from 'react'
import Pagination from 'react-bootstrap/lib/Pagination'

const dbg = debug('app:shared:griddle:pager')

export default class extends Component {
  render() {
    dbg('render: props=%o', this.props)

    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        items={this.props.maxPage}
        maxButtons={5}
        activePage={this.props.currentPage + 1}
        onSelect={this.handleSelect}
      />
    )
  }

  handleSelect = (event, selectedEvent) => {
    const {eventKey} = selectedEvent
    dbg('handle-select: event-key=%o', eventKey)
    this.props.setPage(eventKey - 1)
  }
}
