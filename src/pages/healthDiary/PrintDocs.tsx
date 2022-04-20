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
//pdf viewer
import { Document as Document2, Page as Page2, pdfjs } from 'react-pdf';
import useWindowSize from '../../hooks/useWindowSize';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
  return Component as React.ComponentType<Props & { children: ReactNode }>;
}
const Document = componentWithChildren(_Document);
const Page = componentWithChildren(_Page);

export default function PrintDocs() {
  const windowSize = useWindowSize();
  useEffect(() => {
    Font.register({
      family: 'Spoqa',
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
  };
  //pdf viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }
  //renderer
  const [instance, updateInstance] = usePDF({ document: <MyDoc /> });

  useEffect(() => {
    // setTimeout(() => updateInstance(), 1000);
    updateInstance();
  }, [inputData]);

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>오류: {instance.error}</div>;

  return (
    <div className='col-sm-4 col-md-6'>
      {/* <h2>출력</h2> */}
      {/* <MyDoc /> */}
      <Document2
        loading={'test1'}
        file={instance.url}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          standardFontDataUrl:
            'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
        }}
      >
        <Page2
          loading={'test1'}
          pageNumber={pageNumber}
          width={windowSize.width / 2.3}
          // height={windowSize.height / 5}
        />
      </Document2>
      <a href={instance.url || undefined} download={`${title}.pdf`}>
        다운로드
      </a>
      {/* <PDFViewer width={'100%'} height={'50%'}>
        <MyDoc />
      </PDFViewer> */}
    </div>
  );
}
