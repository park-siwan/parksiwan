import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Inputs } from './type';
const date = new Date();
export const diaryData = atom<Inputs>({
  key: 'diaryData',
  default: {
    createDate: date,
    title: '',
    desc: '',
    morning: '',
    lunch: '',
    dinner: '',
    snack: '',
    nutrients: '',
    sleepTime: date,
    exercise: '',
    review: '',
  },
});
// const diaryDataSelector = selector({
//   key: 'diaryDataSelector',
//   get: ({ get }) => {
//     let list: = get(diaryData);
//     const { createDate } = list;
//     list.createDate = ;
// });
