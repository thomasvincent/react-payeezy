import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'

import ReactPayeezy from './payeezy_us_v5.1.js'

const noop = () => {}

const props = {
  PayeezyApiKey: 'foo',
  PayeezyApiKey: 'foo',
  PayeezyAuthorization: 'foo',
  PayeezynNonce: 'foo',
  PayeezyTimestamp: 'foo',
  PayeezytTimestamp: 'foo',
  token: noop,
  name: 'foo',
  description: 'foo',
  image: 'foo',
  ComponentClass: 'div',
  panelLabel: 'foo',
  amount: 100,
  currency: 'USD',
  locale: 'en',
  email: 'foo@bar.com',
  shippingAddress: false,
  billingAddress: false,
  zipCode: false,
  allowRememberMe: false,
  reconfigureOnUpdate: false,
  triggerEvent: 'onClick',
  className: 'Payeezy'
}

const mockPayeezyHandler = {
  open() {}
}

global.Payeezy = {
  configure() {
    return mockPayeezyHandler
  }
}

const openSpy = expect.spyOn(mockPayeezyHandler, 'open')
const configureSpy = expect.spyOn(Payeezy, 'configure').andCallThrough()

describe('<ReactPayeezy />', () => {
  after(() => {
    /* Deleting so we don't pollute global */
    delete global.Payeezy
  })
  beforeEach(() => {
    /* Removing function calls from previous tests */
    openSpy.reset()
    configureSpy.reset()
  })

  it('should render', () => {
    const renderedComponent = shallow(
      <ReactPayeezy {...props} />
    )
    expect(renderedComponent.is('button')).toEqual(true)
  })
  it('should render the component class it receives as children', () => {
    const renderedComponent = shallow(
      <ReactPayeezy {...props}>
        <div>foo</div>
      </ReactPayeezy>
    )
    expect(renderedComponent.is('div')).toEqual(true)
  })
  it('should pass the `PayeezyApiKey` to Payeezy and configure', () => {
    const renderedComponent = shallow(
      <ReactPayeezy {...props} />
    )
    renderedComponent.instance().onScriptLoaded()
    console.log(configureSpy.calls.length)
    expect(configureSpy).toHaveBeenCalledWith({key: props.PayeezyApiKey})
  })
  it('should pass the `token` function to Payeezy', () => {
    const renderedComponent = shallow(
      <ReactPayeezy {...props} />
    )
    renderedComponent.instance().onScriptLoaded()
    renderedComponent.instance().showPayeezyDialog()
    expect(openSpy).toHaveBeenCalled()
    expect(openSpy.calls[0].arguments[0].token).toEqual(props.token)
  })
})
