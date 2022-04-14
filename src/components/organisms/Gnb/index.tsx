import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from '../../atoms/Flex';
const isActiveStyle = {
  fontWeight: '900',
  color: 'red',
};
const GnbContainer = styled.ul`
  width: 100%;
  display: flex;
`;
const Span = styled.span`
  font-size: 16px;
`;
const Li = styled.li`
  font-size: 16px;
`;

export default function Gnb() {
  return (
    <Flex>
      <Li>
        <NavLink
          to='/'
          style={({ isActive }) => (isActive ? isActiveStyle : {})}
        >
          <Span>소개</Span>
        </NavLink>
      </Li>
      <Li>
        <NavLink
          to='/healthDiary'
          style={({ isActive }) => (isActive ? isActiveStyle : {})}
        >
          <Span>건강 일기</Span>
        </NavLink>
      </Li>
    </Flex>
  );
}
