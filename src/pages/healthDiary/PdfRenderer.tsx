import { ReactNode, useEffect } from 'react';
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
  Svg,
  Circle,
} from '@react-pdf/renderer';
import format from 'date-fns/format';
import ko from 'date-fns/locale/ko';
import { useRecoilValue } from 'recoil';
import { diaryData } from './store';
import { Inputs } from './type';
import FavoriteIcon from '@mui/icons-material/Favorite';
function PdfRenderer({ inputData }: { inputData: Inputs }) {
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

  function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
    return Component as React.ComponentType<Props & { children: ReactNode }>;
  }
  const Document = componentWithChildren(_Document);
  const Page = componentWithChildren(_Page);
  // console.log(styles);
  // useEffect(() => {}, []);
  const S = StyleSheet.create({
    outer: {
      backgroundColor: '#f8cbc9',
      width: '100%',
      boxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
    },
    inner: {
      backgroundColor: 'white',
      // marginTop: 100,
      marginHorizontal: 40,
      marginBottom: 40,
      padding: 10,
      flexGrow: 1,
    },
    text: {
      fontFamily: 'Spoqa',
    },
    header: {
      marginTop: 20,
      paddingBottom: 10,
      paddingRight: 40,
      // width: '100%',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#350d0b',
      textAlign: 'right',
      fontFamily: 'Spoqa',
    },
    title: {
      width: '100%',
      fontSize: '20px',
      fontFamily: 'Spoqa',
    },
  });
  return (
    <Document creator='시완'>
      <Page size='A4' style={S.outer}>
        <Text style={S.header}>HEALTH JOURNAL</Text>
        <Svg viewBox='0 0 100 100' height='210' width='500'>
          <Circle cx='50' cy='50' r='40' fill='tomato' stroke='gray' />
        </Svg>

        {/* </Svg> */}
        {/* </Svg> */}
        {/* 시간 */}
        <Text style={S.header}>
          Date {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}
        </Text>
        <View style={S.inner}>
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
}
export default PdfRenderer;
