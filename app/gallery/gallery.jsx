import debug from 'debug'
import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import DateTimeField from 'react-bootstrap-datetimepicker'
import Select from '../shared/select'

const dbg = debug('app:gallery')

const selectOptions = [
  {value: '+firstName', label: 'first name (descending)'},
  {value: '-firstName', label: 'first name (ascending)'},
  {value: '+lastName', label: 'last name (descending)'},
  {value: '-lastName', label: 'last name (ascending)'}
]

@reduxForm(
  {
    form: 'gallery',
    fields: [
      'aString',
      'aDate',
      'aTime',
      'aDateTime',
      'aSelect',
      'aMultiSelect'
    ]
  }
)
export default class Gallery extends Component {
  render() {
    dbg('render: props=%o', this.props)
    const {
      fields: {
        aString,
        aDate,
        aTime,
        aDateTime,
        aSelect,
        aMultiSelect
      },
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return(
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>Gallery</h3>
        </div>
        <div className='panel-body'>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className='form-group'>
              <label htmlFor='a-string'>a string</label>
              <input type='text' className='form-control' id='a-string' placeholder='a string' {...aString}/>
            </div>
            {/*
            <div className='form-group'>
              <label htmlFor='a-date'>a date</label>
              <input className='form-control' id='a-date' placeholder='a date' data-provide='datepicker' {...aDate}/>
            </div>
            */}
            <div className='form-group'>
              <label htmlFor='a-date'>a date</label>
              <DateTimeField className='form-control' id='a-date' defaultText='a date' mode='date' {...aDate}/>
            </div>
            <div className='form-group'>
              <label htmlFor='a-time'>a time</label>
              <DateTimeField className='form-control' id='a-time' defaultText='a time' mode='time' {...aTime}/>
            </div>
            <div className='form-group'>
              <label htmlFor='a-date-time'>a date time</label>
              <DateTimeField className='form-control' id='a-date-time' defaultText='a date time' {...aDateTime}/>
            </div>
            <div className='form-group'>
              <label htmlFor='a-select'>a select</label>
              <Select
                name='a-select'
                value='+lastName'
                options={selectOptions}
                onBlurResetsInput={false}
                {...aSelect}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='a-multi-select'>a multi select</label>
              <Select
                name='a-multi-select'
                options={selectOptions}
                multi={true}
                onBlurResetsInput={false}
                {...aMultiSelect}
              />
            </div>
            <button type='submit' disabled={submitting} className='btn btn-default'>
              {submitting ? <i className='fa fa-cog fa-spin'/> : <i className='fa fa-paper-plane'/>} Submit
            </button>
            <button className='btn btn-default' disabled={submitting} onClick={resetForm}>Clear</button>
          </form>
        </div>
      </div>
    )
  }

  onSubmit(values) {
    dbg('on-submit: values=%o', values)
  }
}
