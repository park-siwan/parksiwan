import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ko from 'date-fns/locale/ko';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { diaryData } from './store';
import { Inputs } from './type';
import { Font, usePDF } from '@react-pdf/renderer';
import PdfRenderer from './PdfRenderer';
import PdfViewer from './PdfViewer';
const date = new Date();

export default function HealthDiary() {
  const [data, setData] = useRecoilState(diaryData);

  //pdf renderer
  const [instance, updateInstance] = usePDF({
    document: <PdfRenderer inputData={data} />,
  });

  useEffect(() => {
    Font.register({
      family: 'Spoqa',
      src:
        'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
    });
  }, []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,

    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      // ...defaultValue,
      ...data,
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
  // const { isDirty } = useFormState({
  //   // control,
  // });
  // // const { isDirty } = useFormState();
  // console.log(
  //   '🚀 ~ file: index.tsx ~ line 60 ~ HealthDiary ~ isDirty',
  //   isDirty
  // );

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
    setData,
    getValues,
    watch,
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
              {/* <h2>입력</h2> */}
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

              {/* <input type='submit' value='콘솔확인' /> */}
            </Stack>
          </form>
        </div>
        <PdfViewer instance={instance} />
        <button onClick={() => updateInstance()}>pdf 적용하기</button>
      </div>
    </div>
  );
}
