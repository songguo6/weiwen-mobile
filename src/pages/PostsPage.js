import React, { Component, Fragment } from 'react';
import { NavBar, ListView, Card } from 'antd-mobile';
import moment from 'moment';

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

  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];

      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <Card full>
            <Card.Header
              title={obj.author}
              thumb='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
              extra={<span>{moment(moment(obj.time).valueOf()+8*3600000).format('YYYY-MM-DD HH:mm:ss')}</span>}
            />
            <Card.Body>
              <div style={{fontSize: 14}}>{obj.content}</div>
            </Card.Body>
            <Card.Footer content='' extra={<div></div>} />
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