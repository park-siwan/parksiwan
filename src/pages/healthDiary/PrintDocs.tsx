import React from 'react';
import { useRecoilValue } from 'recoil';
import { diaryData } from './store';
import format from 'date-fns/format';
import ko from 'date-fns/locale/ko';
export default function PrintDocs() {
  const inputData = useRecoilValue(diaryData);
  // console.log(inputData);
  const {
    createDate,
    title,
    desc,
    morning,
    lunch,
    dinner,
    snack,
    nutrients,
    sleepTime,
    exercise,
    review,
  } = inputData;
  return (
    <div className='col-sm-4 col-md-6'>
      <h2>출력</h2>
      {createDate && (
        <h3>날짜 : {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}</h3>
      )}
      <h3>제목 : {title}</h3>
      <p>내용 : {desc}</p>
      <h3>아침 : {morning}</h3>
      <h3>점심 : {lunch}</h3>
      <h3>저녁 : {dinner}</h3>
      <h3>간식 : {snack}</h3>
      <h3>영양제 기록 : {nutrients}</h3>
      {/* <h3>수면 시간 : {nutrients}</h3> */}
      <h3>운동 기록 : {exercise}</h3>
      <h3>한줄평 : {review}</h3>
      {/* 수면시간 총합 */}
    </div>
  );
}
