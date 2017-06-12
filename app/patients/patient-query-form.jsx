import debug from 'debug'
import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
// import Select from 'react-select'
// import Select2 from '../shared/select2'

const dbg = debug('app:patients:query')

// const sortOptions = [
//   {value: '+firstName', label: 'first name (descending)'},
//   {value: '-firstName', label: 'first name (ascending)'},
//   {value: '+lastName', label: 'last name (descending)'},
//   {value: '-lastName', label: 'last name (ascending)'}
// ]

function validate(values, props) {
  dbg('validate: values=%o, props=%o', values, props)
  return {}
}

@reduxForm({
  form: 'patientQueryForm',
  fields: ['firstName', 'lastName', 'sort'],
  validate
  // onSubmit: (data) => {
  //   dbg('redux-form: data=%o', data)
  //   getPatients(data)
  // }
})
export default class PatientQueryForm extends Component {
  render() {
    dbg('render: props=%o', this.props)

    const {fields: {firstName, lastName, sort}, handleSubmit, resetForm, submitting, filterPatients} = this.props

    return (
      <form onSubmit={handleSubmit(filterPatients)}>
        <div className="form-group">
          <label htmlFor="first-name">first name: </label>
          <input type="text" className="form-control" id="first-name" placeholder="first name" {...firstName} />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">last name: </label>
          <input type="text" className="form-control" id="last-name" placeholder="last name" {...lastName} />
        </div>
        <div className="form-group">
          <label htmlFor="sort">sort: </label>
          <input type="text" className="form-control" id="sort" placeholder="sort" {...sort} />
          {/*
          <Select
            name='sort'
            value='+lastName'
            options={sortOptions}
            onBlurResetsInput={false}
            {...sort}
          />
          <Select2
            name='sort2'
            value='+lastName'
            options={
              {
                placeholder: 'sort option',
                allowClear: false,
                minimumResultsForSearch: Infinity,
                theme: 'classic'
              }
            }
            {...sort2}
          >
            <option value='+firstName'>firstName</option>
            <option value='-firstName'>-firstName</option>
            <option value='+lastName'>lastName</option>
            <option value='-lastName'>-lastName</option>
          </Select2>
          */}
        </div>
        <button type="submit" disabled={submitting} className="btn btn-default">
          {submitting ? <i className="fa fa-cog fa-spin" /> : <i className="fa fa-paper-plane" />} Submit
        </button>
        <button className="btn btn-default" disabled={submitting} onClick={resetForm}>Clear</button>
      </form>
    )
  }
}
