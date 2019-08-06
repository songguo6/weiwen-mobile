import React, { Component, Fragment } from 'react';
import { NavBar, Button, WhiteSpace } from 'antd-mobile';
import { toast } from '../utils';

const tp = require('tp-eosjs');

class MyPage extends Component {

  state = { balance: '' }

  constructor(props){
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick(){
    if(!tp.isConnected()){
      toast('未连接到 TokenPocket');
    }

    tp.getEosBalance({
      account: 'songguo12345',
      contract: 'eosio.token',
      symbol: 'EOS',
    }).then(res => {
      this.setState({balance: res.data.balance});
    }).catch(error => {
      toast(error);
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar mode='dark'>我的</NavBar>
        <WhiteSpace size='lg'/>
        <Button onClick={this.onBtnClick}>getEosBalance</Button>
        <div>{this.state.balance}</div>
      </Fragment>
    )
  }
}

export default MyPage;