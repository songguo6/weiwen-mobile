import React from 'react';

export const IconText = ({ type, text, onClick }) => (
  <span onClick={onClick}>
    <i class={'iconfont ' + type} style={{ marginRight: 8 }}></i>
    {text}
  </span>
);