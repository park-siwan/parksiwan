import React from 'react'
import classNames from 'classnames/bind';
import home from './_home.module.scss';
const cx = classNames.bind(home);


 const Home = () => {
  return (
    <div className={cx('home')}>
      home 컴포넌트
    </div>
  )
}
export default Home