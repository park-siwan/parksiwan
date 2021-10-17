import React from 'react'
import classNames from 'classnames/bind';
import home from './_home.module.scss';
const cx = classNames.bind(home);


 const Home = () => {
  return (
    <div className={cx('home')}>
      <h1>home 컴포넌트</h1>
      <h2>폰트적용</h2>
    </div>
  )
}
export default Home