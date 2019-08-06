import React from 'react';
import { Toast } from 'antd-mobile';

export const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <i class={'iconfont ' + type} style={{ marginRight: 8 }}></i>
    {text}
  </span>
);

export const toast = (msg) => {
  Toast.info(msg, 1);
}