import React, { ReactNode, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { diaryData } from './store';
import format from 'date-fns/format';
import ko from 'date-fns/locale/ko';
import {
  Page as _Page,
  Document as _Document,
  PDFViewer,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
  BlobProvider,
  Canvas,
  usePDF,
} from '@react-pdf/renderer';
import axios from 'axios';

function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
  return Component as React.ComponentType<Props & { children: ReactNode }>;
}
const Document = componentWithChildren(_Document);
const Page = componentWithChildren(_Page);

export default function PrintDocs() {
  useEffect(() => {
    Font.register({
      family: 'Nanum Gothic',
      src:
        'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
    });
  }, []);
  // https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf
  // https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css
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

  const MyDoc = () => {
    // console.log(styles);

    const S = StyleSheet.create({
      body: {
        width: '100%',
        // webkitBoxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
        boxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
        // width: '100%',
        // flexDirection: 'row',
        backgroundColor: '#ffffff',
      },
      section: {
        // backgroundColor: '#ffffff',
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      text: {
        fontFamily: 'Nanum Gothic',
      },
      header: {
        width: '100%',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'Nanum Gothic',
      },
      title: {
        width: '100%',
        fontSize: '20px',
        fontFamily: 'Nanum Gothic',
      },
    });
    return (
      <Document creator='시완'>
        {/* <Canvas
          paint={{ availableWidth: 100 }}
          // availableWidth={100}
          // availableHeight={100}
        /> */}
        <Page size='A4' style={S.body}>
          <View style={S.section}>
            <Text style={S.header}>
              날짜 : {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}
            </Text>
            <Text style={S.title}>제목 : {title}</Text>
            <Text style={S.text}>
              내용 : {desc}
              아침 : {morning}
              점심 : {lunch}
              저녁 : {dinner}
              간식 : {snack}
              영양제 기록 : {nutrients}
              {/* 수면 시간 : {nutrients} */}
              운동 기록 : {exercise}
              한줄평 : {review}
            </Text>

            {/* 수면시간 총합 */}
          </View>
        </Page>
      </Document>
    );
  };

  const [instance, updateInstance] = usePDF({ document: <MyDoc /> });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;
  return (
    <div className='col-sm-4 col-md-6'>
      {/* <h2>출력</h2> */}
      <MyDoc />
      <a href={instance.url || undefined} download={`${title}.pdf`}>
        다운로드
      </a>
      {/* <PDFViewer width={'100%'} height={'50%'}>
        <MyDoc />
      </PDFViewer> */}
    </div>
  );
}
