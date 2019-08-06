import React, { Component, Fragment } from 'react';
import { NavBar, Button, WhiteSpace } from 'antd-mobile';
import { toast } from '../utils';

const tp = require('tp-eosjs');

class MyPage extends Component {

  state = {
    balance: '',
    account: '',
  }

  constructor(props){
    super(props);
    this.onBtn1Click = this.onBtn1Click.bind(this);
    this.onBtn2Click = this.onBtn2Click.bind(this);
  }

  checkConnect(){
    if(!tp.isConnected()){
      toast('未连接到 TokenPocket');
    }
  }

  onBtn1Click(){
    this.checkConnect();

    tp.getEosBalance({
      account: 'songguo12345',
      contract: 'eosio.token',
      symbol: 'EOS'
    }).then(res => {
      this.setState({balance: res.data});
    });
  }

  onBtn2Click(){
    this.checkConnect();

    tp.getEosAccountInfo({
      account: 'itokenpocket'
    }).then(res => {
      this.setState({account: res.data});
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>

        <Button onClick={this.onBtn1Click}>getEosBalance</Button>
        <WhiteSpace size='lg'/>
        <div>{this.state.balance}</div>

        <Button onClick={this.onBtn2Click}>getEosAccountInfo</Button>
        <WhiteSpace size='lg'/>
        <div>{this.state.account}</div>
      </Fragment>
    )
  }
}

export default MyPage;