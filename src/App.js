import React, { Component } from 'react';
import './App.css';

import { TabBar } from 'antd-mobile';
import PostsPage from './pages/PostsPage';
import MsgsPage from './pages/MsgsPage';
import MyPage from './pages/MyPage';

class App extends Component {

  state = { selectedTab: 'home'};  

  createTabItem = (title, key, icon, selectedIcon, page, badge = false) => (
    <TabBar.Item
      title={title}
      key={key}
      icon={<i class={'iconfont ' + icon}></i>}
      selectedIcon={<i class={'iconfont ' + selectedIcon}></i>}
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
        {this.createTabItem('首页', 'home', 'icon-home', 'icon-home1', <PostsPage />)}
        {this.createTabItem('消息', 'msg', 'icon-xiaoxi-control', 'icon-xiaoxi-control1', <MsgsPage />, 1)}
        {this.createTabItem('我的', 'my', 'icon-geren', 'icon-geren-copy', <MyPage />)}
      </TabBar>
    );
  }
}

export default App;
