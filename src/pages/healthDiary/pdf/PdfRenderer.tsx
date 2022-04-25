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
import { S, primary, gray } from './style';
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
      <Page size='A4' style={{ ...S.font, ...S.outer }}>
        <View style={S.header}>
          {/* 순번 */}
          <Text style={{ ...S.headerText, color: primary[500] }}>
            HEALTH JOURNAL
          </Text>
          {/* 하트 png 이미지*/}
          <Image src={heartIcon} style={{ width: 48 }} />
          {/* 시간 */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                ...S.headerText,
                color: primary[500],
                marginRight: 10,
              }}
            >
              Date
            </Text>
            <Text style={{ ...S.headerText, fontWeight: 700 }}>
              {format(createDate, 'yyyy.MM.dd.E', { locale: ko })}
            </Text>
          </View>
        </View>
        <View style={S.inner}>
          <View style={{ flexDirection: 'row' }}>
            <View style={S.foods}>
              <View style={S.food}>
                <Text style={S.foodTitle}>아침</Text>
                <Text style={S.foodDesc}>{morning}</Text>
              </View>
              <View style={S.food}>
                <Text style={S.foodTitle}>점심</Text>
                <Text style={S.foodDesc}>{lunch}</Text>
              </View>
              <View style={S.food}>
                <Text style={S.foodTitle}>저녁</Text>
                <Text style={S.foodDesc}>{dinner}</Text>
              </View>
              <View style={{ ...S.food, borderBottom: 0 }}>
                <Text style={S.foodTitle}>간식</Text>
                <Text style={S.foodDesc}>{snack}</Text>
              </View>
            </View>
            <View style={S.rightBodies}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: primary[600],
                  marginBottom: 8,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontWeight: 400,
                  color: gray[500],
                }}
              >
                {desc}
              </Text>
            </View>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>영양제 기록</Text>
            <Text style={S.bottomDesc}>{nutrients} </Text>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>수면 시간 </Text>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>운동 기록</Text>
            <Text style={S.bottomDesc}>{exercise}</Text>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>한줄평</Text>
            <Text style={S.bottomDesc}>{review}</Text>
          </View>
          {/* 수면시간 총합 */}
        </View>
      </Page>
    </Document>
  );
}
export default PdfRenderer;
