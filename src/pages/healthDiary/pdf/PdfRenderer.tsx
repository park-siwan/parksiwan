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
  Image,
  Circle,
} from '@react-pdf/renderer';
import format from 'date-fns/format';
import ko from 'date-fns/locale/ko';
import { useRecoilValue } from 'recoil';
import { diaryData } from '../store';
import { Inputs } from '../type';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { S } from './style';
import heartIcon from './heartIcon.png';
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
  // const Heart = () => (
  //   <Svg height={50} width={50}>
  //     <Circle cx='50' cy='50' r='40' fill='tomato' stroke='gray' />
  //   </Svg>
  // );
  return (
    <Document creator='시완'>
      <Page size='A4' style={S.outer}>
        <View style={S.header}>
          {/* <Svg height={50} width={50} /> */}
          <Text style={S.headerTextLeft}>HEALTH JOURNAL</Text>
          <Image
            src={heartIcon}
            style={{ width: 50, height: 'auto', display: 'flex' }}
          />
          {/* <Heart /> */}
          {/* 시간 */}
          <Text style={S.headerTextRight}>
            Date {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}
          </Text>
        </View>
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
