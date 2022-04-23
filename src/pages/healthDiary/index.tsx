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
// import Button from '../../components/atoms/Button';
import {
  Button,
  ButtonGroup,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { blueGrey, pink } from '@mui/material/colors';
import Flex from '../../components/atoms/Flex';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { SimCardDownloadIcon } from '@mui/icons-material/';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>, target: string) => {
    // console.log(event);
    console.log(target);
    if (target === 'createPdf') {
      //modal창 띄우고 pdf미리보기, pdf다운로드, pdf 새창보기 넣어야함
      updateInstance();
    }

    setAnchorEl(null);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div
      className='container'
      css={css`
        /* background-color: ${blueGrey[50]}; */
      `}
    >
      <div
        className='row'
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div
          className='col-sm-4 col-md-6'
          css={css`
            box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
            z-index: 1;
          `}
        >
          <div
            // jc='between' fullWidth mt={20} mb={20}
            css={css`
              display: flex;
              justify-content: space-between;
              width: 100%;
              margin-top: 20px;
              margin-bottom: 20px;
            `}
          >
            <IconButton aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h4' component='h1'>
              Health Diary
            </Typography>
            <div>
              <IconButton
                // onClick={updateInstance}
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMoreClick}
                aria-label='more features'
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={(e) => handleClose(e, 'createPdf')}
                  sx={{ width: 320, maxWidth: '100%' }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>PDF 생성하기</ListItemText>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                  ></Typography>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div
        className='row'
        css={css`
          justify-content: center;
        `}
      >
        <div
          className='col-sm-4 col-md-6'
          css={css`
            background-color: white;
            box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
          `}
          style={{
            paddingTop: '40px',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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
                    renderInput={(params) => (
                      <TextField variant='standard' {...params} />
                    )}
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
                    variant='standard'
                  />
                )}
              />
              <h3>본문</h3>
              <Controller
                name='desc'
                control={control}
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    aria-label='diary contents'
                    placeholder='내용을 입력해주세요'
                    minRows={3}
                    style={{ width: '100%' }}
                  />
                )}
              />

              <Controller
                name='morning'
                control={control}
                render={({ field }) => (
                  <TextField
                    label='아침'
                    {...field}
                    placeholder='아침 식사를 입력하세요'
                    variant='standard'
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
                    variant='standard'
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
                    variant='standard'
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
                    variant='standard'
                  />
                )}
              />

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
                    variant='standard'
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
                    variant='standard'
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
                    variant='standard'
                  />
                )}
              />
            </Stack>
          </form>
          <Flex fullWidth mb={120} />
        </div>
      </div>
    </div>
  );
}
