import React, { Component } from 'react'
import DataFetchingComponent from './datFetch/usersGet'
import { useSelector } from 'react-redux'

type Props = {}

type State = {}

export default class Blog extends Component<Props, State> {
  // state = {}



  render() {
    return (
      <>
        <h1>Pizza</h1>
        {}
        <hr></hr>
        <div>blog</div><DataFetchingComponent />
      </>
    )
  }
}