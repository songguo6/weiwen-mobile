import React, { Component, Fragment } from 'react';
import { NavBar } from 'antd-mobile';

class PostsPage extends Component {

  render() {
    return (
      <Fragment>
        <NavBar mode='dark' rightContent='发布'>
          微文
        </NavBar>
        微文列表
      </Fragment>
    )
  }
}

export default PostsPage;