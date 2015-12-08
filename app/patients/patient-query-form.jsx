import debug from 'debug'
import React, {Component} from 'react'
import {reduxForm} from 'redux-form'

const dbg = debug('app:patients:query')

function validate(values, props) {
  dbg('validate: values=%o, props=%o', values, props)
  return {}
}

@reduxForm(
  {
    form: 'patientQueryForm',
    fields: ['firstName', 'lastName'],
    validate//,
    // onSubmit: (data) => {
    //   dbg('redux-form: data=%o', data)
    //   getPatients(data)
    // }
  }
)
export default class PatientQueryForm extends Component {
  render() {
    dbg('render: props=%o', this.props)

    const {
      fields: {
        firstName,
        lastName
      },
      handleSubmit,
      resetForm,
      submitting,
      getPatients
    } = this.props;

    return(
      <form onSubmit={handleSubmit(getPatients)}>
        <div className='form-group'>
          <label htmlFor='first-name'>first name</label>
          <input type='text' className='form-control' id='first-name' placeholder='first name' {...firstName}/>
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>last name</label>
          <input type='text' className='form-control' id='last-name' placeholder='last name' {...lastName}/>
        </div>
        <button type='submit' disabled={submitting} className='btn btn-default'>
          {submitting ? <i className='fa fa-cog fa-spin'/> : <i className='fa fa-paper-plane'/>} Submit
        </button>
        <button className='btn btn-default' disabled={submitting} onClick={resetForm}>Clear</button>
      </form>
    )
  }
}
