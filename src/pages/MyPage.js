import React, { Component, Fragment } from 'react';
import { NavBar, Button, Toast } from 'antd-mobile';

const tp = require('tp-eosjs');

class MyPage extends Component {

  componentDidMount(){
    Toast.info('isConnected: '+tp.isConnected(),1);
  }

  render() {
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>
        <Button>Login</Button>
        <Button>Logout</Button>
      </Fragment>
    )
  }
}

export default MyPage;