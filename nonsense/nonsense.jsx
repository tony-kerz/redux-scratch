import debug from 'debug'
import React, {Component} from 'react'
import $ from 'jquery'
import 'semantic-ui-css/components/accordion'

const dbg = debug('app:nonsense')

export default class Nonsense extends Component {
  render() {
    return(
      <div className='ui segment'>
        <div className='ui segments raised'>
          <h3 className='ui segment header'>
            Nonsense
          </h3>
          <div className='ui segment secondary'>
            <div className='ui styled fluid accordion' ref='anAccordion'>
              <div className='title active'>
                <i className='dropdown icon' />
                What is a dog?
              </div>
              <div className='content active'>
                <p className='transition visible' style={{display: 'block !important'}}>
                  A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
                </p>
              </div>
              <div className='title'>
                <i className='dropdown icon' />
                What kinds of dogs are there?
              </div>
              <div className='content'>
                <p className='transition hidden'>
                  There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.
                </p>
              </div>
              <div className='title'>
                <i className='dropdown icon' />
                How do you acquire a dog?
              </div>
              <div className='content'>
                <p
                  className='transition hidden'
                  style={{display: 'block !important'}}>
                  Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
                </p>
                <p
                  className='transition hidden'
                  style={{display: 'block !important'}}>
                  A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    $(this.refs.anAccordion).accordion()
  }
}
