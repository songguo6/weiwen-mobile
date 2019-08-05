import React, { Component, Fragment } from 'react';
import { NavBar, Button } from 'antd-mobile';

import { withUAL } from 'ual-reactjs-renderer';

class MyPage extends Component {

  displayLoginModal = (display) => {
    const {ual: {showModal, hideModal}} = this.props;
    if(display){
      showModal();
    }else{
      hideModal();
    }
  }

  login = () => this.displayLoginModal(true);

  render() {
    const {ual: { logout }} = this.props;
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>
        <Button onClick={this.login}>Login</Button>
        <Button onClick={logout}>Logout</Button>
      </Fragment>
    )
  }
}

export default withUAL(MyPage);