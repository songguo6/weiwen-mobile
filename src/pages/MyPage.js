import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavBar, Button, WhiteSpace } from 'antd-mobile';
import { login, logout, checkLogin } from '../api/login';
// import { toast } from '../utils';

// const tp = require('tp-eosjs');

class MyPage extends Component {

  componentDidMount(){
    this.props.checkLogin();
    // toast('isConnected: ' + tp.isConnected());
  }

  render() {
    const { logged, login, logout, user } = this.props;
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>
        <Button
          onClick={logged.name ? logout: login }
        >
          {logged.name ? '注销' : '登录'}
        </Button>
        <WhiteSpace size='lg'/>
        <div>{user.account}</div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
    user : state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    login(){
      dispatch(login);  
    },
    logout(){
      dispatch(logout);  
    },
    checkLogin(){
      dispatch(checkLogin);
    }, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);