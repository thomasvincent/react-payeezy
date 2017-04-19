[![npm version](https://badge.fury.io/js/react-Payeezy-.svg)](http://badge.fury.io/js/react-payeezy)
[![Dependencies Status](https://david-dm.org/azmenak/react-Payeezy-.svg)](https://david-dm.org/react-payeezy)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/thomasvincent/react-payeezy)

# React Payeezy Component
Payeezy original API is very thorough and this makes it more react. The component is based on a implimentation for Stripe form Adam Zmenak at https://github.com/azmenak/react-stripe-checkout . 

### Installation

Get started by installing with npm

    npm install react-payeezy

Requires babel for compiling. If anyone is having issues with that,
open an issue and I'll do my best to better document the build process.

### Requirements

`token` and `PayeezyApiKey` are the only *required* props,
everything else is optional as per the Payeezy docs. See [
Docs](https://Payeezy.com/docs/#integration-custom). All props
go through simple validation and are passed to Payeezy , they're
also documented in `payeezy_us_v5.1.js`.

```jsx
import React from 'react'
import Payeezy from 'react-Payeezy-';

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-Payeezy-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
    return (
      // ...
      <Payeezy
        token={this.onToken}
        PayeezyApiKey="my_PUBLISHABLE_PayeezyApiKey"
      />
    )
  }
}
```

This will give you a default *Payeezy-style* button which looks like this:

![Payeezy  button](https://www.dropbox.com/s/tuwlslyrxubgc49/Screenshot%202016-08-05%2011.53.37.png?dl=1)

### Send all the props!

```jsx
<Payeezy
  name="Three Comma Co."
  description="Big Data Stuff"
  image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
  ComponentClass="div"
  panelLabel="Give Money"
  amount={1000000}
  currency="USD"
  PayeezyApiKey="..."
  locale="zh"
  email="info@vidhub.co"
  // Note: Enabling either address option will give the user the ability to
  // fill out both. Addresses are sent as a second parameter in the token callback.
  shippingAddress
  billingAddress={false}
  // Note: enabling both zipCode checks and billing or shipping address will
  // cause zipCheck to be pulled from billing address (set to shipping if none provided).
  zipCode={false}
  alipay
  bitcoin
  allowRememberMe
  token={this.onToken}
  // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
  // you are using multiple Payeezy keys
  reconfigureOnUpdate={false}
  // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
  // useful if you're using React-Tap-Event-Plugin
  triggerEvent="onTouchTap"
  >
  <button className="btn btn-primary">
    Use your own child component, which gets wrapped in whatever
    component you pass into as "ComponentClass" (defaults to span)
  </button>
</Payeezy>
```

### Other info
Pull requests welcome
