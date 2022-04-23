import React from 'react';
import { format } from 'date-fns';
import { useForm, SubmitHandler } from 'react-hook-form';
type Inputs = {
  date: string;
  morning: string;
  lunch: string;
  dinner: string;
  snack: string;
};
export default function HealthDiary() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // const date = Date.now();
  const date = new Date();
  const today = format(date, 'yyyy-MM-dd');
  const dayOfWeek = format(date, 'eeee');

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            HealthDiary
            <h3>날짜</h3>
            <input
              {...register('date')}
              className='form-input'
              type='date'
              value={today}
            />
            <h4>{dayOfWeek}</h4>
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
            <input type='submit' />
          </form>
        </div>
      </div>
    </div>
  );
}
