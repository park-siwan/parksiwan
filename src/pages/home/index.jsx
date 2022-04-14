import React, { useState } from 'react';
import classNames from 'classnames/bind';
import home from './_home.module.scss';

import styled from '@emotion/styled';
const cx = classNames.bind(home);

const Home = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className={cx('home')}>
          <div className='col-sm-4'>
            <h1>프론트엔드 개발자 박시완</h1>
            {/* <h2>폰트적용</h2> */}
            {/* <input className='form-input' type='text' /> */}
            {/* <button>버튼</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
