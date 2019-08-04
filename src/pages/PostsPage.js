import React, { Component, Fragment } from 'react';
import { NavBar, ListView, Card, Flex, WhiteSpace, PullToRefresh } from 'antd-mobile';
import moment from 'moment';

import { IconText } from '../utils';
import * as ipfsApi from '../api/ipfsApi';
import { fetchAll } from '../api/fetch';

const ROWS_OF_PAGE = 10;  //每页数据条数

class PostsPage extends Component {

  constructor(props) {
    super(props);

    this.pageIndex = 0;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      data: [],
      dataSource,
      refreshing: true,
      isLoading: true,
    };
  }

  genOnePageData(pIndex = 0) {
    const dataOnePage = [];
    for (let i = 0; i < ROWS_OF_PAGE; i++) {
      const item = this.state.data[pIndex * ROWS_OF_PAGE + i];
      if(item !== undefined){
        dataOnePage.push(item);
      }
    }
    return dataOnePage;
  }

  async componentDidMount() {
    const res = await fetchAll('posttable');
    this.setState({data: res});

    this.rData = this.genOnePageData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true, isLoading: true });
    const res = await fetchAll('posttable');
    this.setState({data: res});

    this.rData = this.genOnePageData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    });
    this.pageIndex = 0;
  };

  onEndReached = (event) => {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.rData = [...this.rData, ...this.genOnePageData(++this.pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  };

  renderAttachment(type, attachment){
    if(type === 1){
      return <a href={attachment}><IconText type='icon-link' text={attachment} /></a> 
    }else if(type === 2){
      return <a href={ipfsApi.ipfsUrl(attachment)}><IconText type='icon-link' text={attachment} /></a> 
    }else if(type === 3){
      return (
        <a href={ipfsApi.ipfsUrl(attachment)} target='_blank' rel='noopener noreferrer'>
          <img src={ipfsApi.ipfsUrl(attachment)} alt='' style={{width: 230, height: 100}}/>
        </a>
      )
    }
    return '';
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      const item = rowData;
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <Card full>
            <Card.Header
              title={item.author}
              thumb='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
              extra={<span style={{fontSize: '14px'}}>{moment(moment(item.time).valueOf()+8*3600000).format('YYYY-MM-DD HH:mm')}</span>}
            />
            <Card.Body>
              <WhiteSpace size='xs'/>
              <div className='item-content'>{item.content}</div>
              <WhiteSpace size='lg'/>
              {
                item.attachtype ? 
                <div className='item-attach'>
                  {this.renderAttachment(item.attachtype, item.attachment)}
                </div> : ''
              }
              <WhiteSpace size='lg'/>
              <Flex style={{color: 'rgba(0,0,0,.45)', fontSize: '14px'}}>
                <Flex.Item><IconText type='icon-money' text={parseFloat(item.balance).toFixed(2)} /></Flex.Item>
                <Flex.Item><IconText type='icon-dianzan' text={item.like_num} onClick={() => {console.log('like:'+item.id)}} /></Flex.Item>
                <Flex.Item><IconText type='icon-comment' text={item.comment_num} onClick={() => {console.log('comment:'+item.id)}} /></Flex.Item>
              </Flex>
            </Card.Body>
          </Card>
        </div>
      );
    };
    return (
      <Fragment>
        <NavBar mode='dark' rightContent='发布'>
          微文
        </NavBar>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={(sectionID, rowID) => (
            <div 
              key={rowID}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          )}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '加载完成'}
            </div>
          )}
          style={{height: document.documentElement.clientHeight}}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </Fragment>
    );
  }
}

export default PostsPage;