import React from 'react';
import { format } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextareaAutosize from '@mui/material/TextareaAutosize';
type Inputs = {
  createDate: string;
  title: string;
  desc: string;
  morning: string;
  lunch: string;
  dinner: string;
  snack: string;
};
const date = new Date();
const today = format(date, 'yyyy-MM-dd');
const dayOfWeek = format(date, 'eeee');

export default function HealthDiary() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      createDate: today,
      title: '건강일기 내용',
      desc: '아침 수업이 있어서 7시에 일어나 시리얼을 먹고 학교를 갔다.',
      morning: '샐러드',
      lunch: '국밥',
      dinner: '떡볶이',
      snack: '아메리카노',
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const { createDate, title, desc, morning, lunch, dinner, snack } = watch();

  return (
    <div className='container'>
      <div className='row'>
        <h1>건강 일기</h1>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>입력</h2>
            <h3>날짜</h3>
            <input
              {...register('createDate')}
              className='form-input'
              type='date'
            />
            <h4>{dayOfWeek}</h4>
            <h3>제목</h3>
            <input {...register('title')} className='form-input' />
            <h3>내용</h3>
            {/* <textarea {...register('desc')} className='form-input' /> */}
            <Controller
              name='desc'
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  aria-label='diary contents'
                  placeholder='Empty'
                  minRows={3}
                  style={{ width: '100%' }}
                />
              )}
            />

            <hr />
            <h3>아침</h3>
            <input
              {...register('morning')}
              className='form-input'
              type='text'
            />
            <h3>점심</h3>
            <input {...register('lunch')} className='form-input' type='text' />
            <h3>저녁</h3>
            <input {...register('dinner')} className='form-input' type='text' />
            <h3>간식</h3>
            <input {...register('snack')} className='form-input' type='text' />
            {/* <input type='submit' value='저장하기' /> */}
          </form>
        </div>
        <div className='col-md-6'>
          <h2>출력</h2>
          <h3>날짜 : {createDate}</h3>
          <h3>제목 : {title}</h3>
          <p>내용 : {desc}</p>
          <h3>아침 : {morning}</h3>
          <h3>점심 : {lunch}</h3>
          <h3>저녁 : {dinner}</h3>
          <h3>간식 : {snack}</h3>
        </div>
      </div>
    </div>
  );
}
