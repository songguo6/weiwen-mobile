import React, { Component } from 'react';
import './App.css';

import { TabBar } from 'antd-mobile';
import PostsPage from './pages/PostsPage';
import MsgsPage from './pages/MsgsPage';
import MyPage from './pages/MyPage';

class App extends Component {

  state = { selectedTab: 'home'};  

  createTabItem = (title, key, iconUrl, sIconUrl, page, badge = false) => (
    <TabBar.Item
      title={title}
      key={key}
      icon={<div style={{
        width: '22px',
        height: '22px',
        background: 'url(' + iconUrl + ') center center /  21px 21px no-repeat' 
      }}/>}
      selectedIcon={<div style={{
        width: '22px',
        height: '22px',
        background: 'url(' + sIconUrl + ') center center /  21px 21px no-repeat'
      }}/>}
      selected={this.state.selectedTab === key}
      onPress={() => {this.setState({selectedTab: key})}}
      badge={badge}
    >
      <div style={{height: document.documentElement.clientHeight - 50}}>{page}</div>
    </TabBar.Item>
  )

  render(){
    return (
      <TabBar
        unselectedTintColor='#949494'
        tintColor='#33A3F4'
        barTintColor='white'
      >
        {this.createTabItem('首页','home',
          'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
          'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
          <PostsPage />
        )}
        {this.createTabItem('消息','msg',
          'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
          'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
          <MsgsPage />, 1
        )}
        {this.createTabItem('我的', 'my',
          'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
          'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
          <MyPage />
        )}
        </TabBar>
    );
  }
}

export default App;
