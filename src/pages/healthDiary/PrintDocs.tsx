import React, { ReactNode, useEffect } from 'react';
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
  // ReactPDF,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    // width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontFamily: 'Nanum Gothic',
  },
});

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
        'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf',
    });

    console.log(Font.load);
  }, []);

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
    return (
      <Document creator='시완'>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>
              {createDate && (
                <>날짜 : {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}</>
              )}
              제목 : {title}
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
  const DownLoad = () => (
    <PDFDownloadLink document={<MyDoc />} fileName={`${title}.pdf`}>
      {({ blob, url, loading, error }) => {
        // console.log(
        //   '🚀 ~ file: PrintDocs.tsx ~ line 111 ~ PrintDocs ~ blob',
        //   blob
        // );
        const size = blob?.size;
        if (size === undefined) {
          return;
        }
        const mbSize = size / 1024 / 1024;
        return (
          <>
            <div>{loading ? '문서 로딩중...' : '다운로드 하기'}</div>
            <div>{`크기 : ${mbSize.toFixed(2)}mb`}</div>
          </>
        );
      }}
    </PDFDownloadLink>
  );
  return (
    <div className='col-sm-4 col-md-6'>
      <h2>출력</h2>
      {/* <PDFViewer width={'100%'} height={'100%'}>
        <MyDoc />
      </PDFViewer> */}
      <DownLoad />
    </div>
  );
}
{
  /* <h2>출력</h2>
{createDate && (
  <h3>
    날짜 : {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}
  </h3>
)}
<h3>제목 : {title}</h3>
<p>내용 : {desc}</p>
<h3>아침 : {morning}</h3>
<h3>점심 : {lunch}</h3>
<h3>저녁 : {dinner}</h3>
<h3>간식 : {snack}</h3>
<h3>영양제 기록 : {nutrients}</h3>
{/* <h3>수면 시간 : {nutrients}</h3> */
}
{
  /* <h3>운동 기록 : {exercise}</h3>
<h3>한줄평 : {review}</h3> */
}
