import React, { Component, Fragment } from 'react';
import { NavBar } from 'antd-mobile';

class MyPage extends Component {

  render() {
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>
        我的
      </Fragment>
    )
  }
}

export default MyPage;