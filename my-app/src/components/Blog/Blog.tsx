import React, { Component } from 'react'
import DataFetchingComponent from '../datFetch/usersGet'

type Props = {}

type State = {}

export default class Blog extends Component<Props, State> {
  state = {}

  render() {
    return (
      <><div>blog</div><DataFetchingComponent /></>
    )
  }
}