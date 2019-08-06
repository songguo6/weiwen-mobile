import React, { Component, Fragment } from 'react';
import { NavBar, Button } from 'antd-mobile';

class MyPage extends Component {

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