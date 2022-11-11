import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <div className='index'>
        <h1>Hello world!!!</h1>
        <van-button type="primary">红包雨</van-button>
      </div>
    );
  }
}