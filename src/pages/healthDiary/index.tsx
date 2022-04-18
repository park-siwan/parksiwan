import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ko from 'date-fns/locale/ko';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { diaryData } from './store';
import { Inputs } from './type';
import PrintDocs from './PrintDocs';
const date = new Date();
// const today = format(date, 'yyyy.MM.dd.E');
// const dayOfWeek = format(date, 'E');
const defaultValue = {
  createDate: date,
  title: '오늘의 건강일기',
  desc:
    '아침 수업이 있어서 7시에 일어나 시리얼을 먹고 학교를 갔다.\n\n점심은 2시쯤 집에와서 떡갈비, 스팸, 검은콩, 일미를 차려서 먹었다.\n\n저녁은 8시에 국밥을 먹고 집을 갔다.\n\n매일 학교 갈때 올때 걸어다니며, 오늘은 6시에 테니스 동아리가 있어서 2시간정도 유산소 운동을 했다.',
  morning: '시리얼',
  lunch: '떡갈비, 스팸, 검은콩, 일미',
  dinner: '국밥',
  snack: '아메리카노',
  nutrients: '유산균, 비타민C, 오메가3',
  // sleepTime:'',
  exercise: '테니스 운동을 2시간 했다.',
  review: '유산소 운동 2시간 하고 밥도 잘 챙겨먹었다.',
};
export default function HealthDiary() {
  const [data, setData] = useRecoilState(diaryData);
  // const [value, setValue] = useState<Date | null>(date);
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValue,
    },
  });

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
  } = watch();

  useEffect(() => {
    const current = getValues();
    setData(current);
  }, [
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
  ]);

  // console.log(createDate);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
          <h1>헬스 다이어리</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4 col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <h2>입력</h2>
              <Controller
                name='createDate'
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label='날짜'
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    inputFormat={'yyyy.MM.dd'}
                    mask='____.__.__'
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='제목'
                    {...field}
                    placeholder='제목을 입력하세요'
                  />
                )}
              />
              <h3>본문</h3>
              <Controller
                name='desc'
                control={control}
                render={({ field }) => (
                  <TextareaAutosize
                    // className='form-input'
                    {...field}
                    aria-label='diary contents'
                    placeholder='내용을 입력해주세요'
                    minRows={3}
                    style={{ width: '100%' }}
                  />
                )}
              />
              <hr />
              <Controller
                name='morning'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='아침'
                    {...field}
                    placeholder='아침 식사를 입력하세요'
                  />
                )}
              />
              <Controller
                name='lunch'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='점심'
                    {...field}
                    placeholder='점심 식사를 입력하세요'
                  />
                )}
              />
              <Controller
                name='dinner'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='저녁'
                    {...field}
                    placeholder='저녁 식사를 입력하세요'
                  />
                )}
              />
              <Controller
                name='snack'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='간식'
                    {...field}
                    placeholder='간식 식사를 입력하세요'
                  />
                )}
              />
              <hr />
              {/* 영양제기록 : 오토컴플리트(freesolo + Multiple values) */}
              {/* 수면시간 : 타임픽커 */}
              {/* 운동기록 : 오토컴플리트(freesolo운동종류 + dialog운동시간입력 요청 ) */}
              <Controller
                name='nutrients'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='영양제'
                    {...field}
                    placeholder='영양제를 입력하세요'
                  />
                )}
              />
              <Controller
                name='exercise'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='운동'
                    {...field}
                    placeholder='운동을 기록해주세요'
                  />
                )}
              />
              <Controller
                name='review'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='한줄평'
                    {...field}
                    placeholder='한줄평을 남겨주세요'
                  />
                )}
              />

              <input type='submit' value='콘솔확인' />
            </Stack>
          </form>
        </div>
        <PrintDocs />
      </div>
    </div>
  );
}
