//import debug from 'debug'
import React, {Component} from 'react'

export default class extends Component {
  getDefaultProps() {
    return {
      maxPage: 0,
      nextText: 'nexxt',
      previousText: 'prevv',
      currentPage: 0
    }
  }

  pageChange = (event) => {
    this.props.setPage(parseInt(event.target.getAttribute('data-value')))
  };

  render() {
    var previous = ''
    var next = ''

    if (this.props.currentPage > 0) {
      previous = <span onClick={this.props.previous} className='previous'><i className='glyphicon glyphicon-arrow-left'></i>{this.props.previousText}</span>
    }

    if (this.props.currentPage != (this.props.maxPage -1)){
      next = <span onClick={this.props.next} className='next'>{this.props.nextText}<i className='glyphicon glyphicon-arrow-right'></i></span>
    }

    var options = []

    var startIndex = Math.max(this.props.currentPage - 5, 0)
    var endIndex = Math.min(startIndex + 11, this.props.maxPage)

    if (this.props.maxPage >= 11 && (endIndex - startIndex) <= 10) {
      startIndex = endIndex - 11
    }

    for (var i = startIndex; i < endIndex ; i++) {
      var selected = this.props.currentPage == i ? 'current-page-selected' : ''
      options.push(<button className={selected} data-value={i} onClick={this.pageChange}>{i + 1}</button>)
    }

    return (
      <div className='row custom-pager'>
        <div className='col-xs-4'>{previous}</div>
        <div className='col-xs-4 center pages'>
          {options}
        </div>
        <div className='col-xs-4 right'>{next}</div>
      </div>
    )
  }
}
