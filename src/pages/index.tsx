import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import HealthDiary from './healthDiary';
export default function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/healthDiary' element={<HealthDiary />} />
    </Routes>
  );
}
