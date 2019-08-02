import React, { Component, Fragment } from 'react';
import { NavBar, ListView, Card, Flex, WhiteSpace } from 'antd-mobile';
import moment from 'moment';

import * as ipfsApi from '../api/ipfsApi';
import { data } from '../data';

const NUM_ROWS = 20;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <i class={'iconfont ' + type} style={{ marginRight: 8 }}></i>
    {text}
  </span>
);

class PostsPage extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = { dataSource };
  }

  componentDidMount() {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(genData())});
  }

  renderAttachment(type, attachment){
    if(type === 1){
      return <a href={attachment}><IconText type='icon-link' text={attachment} /></a> 
    }else if(type === 2){
      return <a href={ipfsApi.ipfsUrl(attachment)}><IconText type='icon-link' text={attachment} /></a> 
    }else if(type === 3){
      return (
        <a href={attachment} target='_blank' rel='noopener noreferrer'>
          <img src={attachment} alt='' style={{width: 230, height: 100}}/>
        </a>
      )
    }
    return '';
  }

  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const item = data[index--];

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
          useBodyScroll
        />
      </Fragment>
    );
  }
}

export default PostsPage;