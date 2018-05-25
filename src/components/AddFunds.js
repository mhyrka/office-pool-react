import React, { Component } from 'react'
import {Elements} from 'react-stripe-elements'
import InjectedCheckoutForm from './CheckoutForm';

class AddFunds extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    )
  }
}

export default AddFunds
