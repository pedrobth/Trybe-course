import React, { Component } from 'react';

export default class CalcShipping extends Component {
  render() {
    return (
      <form>
        <label htmlFor="zipcode"
        >
          CEP: <input id="zipcode" name="zipcode" type="number" ></input>
        </label>
      </form>
    )
  }
}