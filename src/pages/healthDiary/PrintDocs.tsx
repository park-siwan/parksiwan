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
  // ReactPDF,
} from '@react-pdf/renderer';
function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
  return Component as React.ComponentType<Props & { children: ReactNode }>;
}
const Document = componentWithChildren(_Document);
const Page = componentWithChildren(_Page);
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  //overload 하나의 함수 또는 연산자가 입력에 따라 여러가지 동작을 하도록
  <Document creator='시완'>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
// ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
// ReactPDF.renderToStream(<MyDocument />);
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
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
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
