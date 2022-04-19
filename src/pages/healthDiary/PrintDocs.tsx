import React, { ReactNode } from 'react';
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
  // ReactPDF,
} from '@react-pdf/renderer';
function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
  return Component as React.ComponentType<Props & { children: ReactNode }>;
}
const Document = componentWithChildren(_Document);
const Page = componentWithChildren(_Page);
Font.register({
  family: 'Nanum Gothic',
  src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf',
});
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
  const MyDoc = () => (
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
  return (
    <div className='col-sm-4 col-md-6'>
      <h2>출력</h2>
      <PDFViewer>
        <MyDoc />
      </PDFViewer>
      <PDFDownloadLink document={<MyDoc />} fileName='somename.pdf'>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
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
