import React, { Component, Fragment } from 'react';
import { NavBar } from 'antd-mobile';

const tp = require('tp-js-sdk')

class MsgsPage extends Component {

  state = {
    isConnected: false,
    info: '',
  }

  componentDidMount(){
    this.setState({isConnected: tp.isConnected()});
    tp.getEosBalance({
      account: 'weiwendapps2',
      contract: 'weiwentoken2',
      symbol: 'WEI'
    }).then(res => {
      this.setState({info: res})
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar mode='dark'>消息</NavBar>
        <div>isConnected: {this.state.isConnected}</div>
        <div>info: {this.state.info}</div>
      </Fragment>
    )
  }
}

export default MsgsPage;