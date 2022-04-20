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
  // BlobProvider,
  // ReactPDF,
} from '@react-pdf/renderer';

import axios from 'axios';
// import ReactPDF from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    width: '100%',
    webkitBoxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
    boxShadow: '0 25px 50px 0 rgb(62 62 62 / 15%)',
    // width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  // section: {
  //   margin: 10,
  //   padding: 10,
  //   flexGrow: 1,
  // },
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
    // setTimeout(
    //   () =>
    //     Font.register({
    //       family: 'Nanum Gothic',
    //       src:
    //         'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf',
    //     }),
    //   2000
    // );
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
        {/* <Canvas
          paint={{ availableWidth: 100 }}
          // availableWidth={100}
          // availableHeight={100}
        /> */}
        <Page size='A4' style={styles.page}>
          {/* <View style={styles.section}> */}
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
          {/* </View> */}
        </Page>
      </Document>
    );
  };
  // ReactPDF.renderToStream(<MyDoc />);
  const DownLoad = (): any => {
    // console.log(Font);
    // console.log(Font.load());

    return (
      <PDFDownloadLink document={<MyDoc />} fileName={`${title}.pdf`}>
        {({ blob, url, loading, error }) => {
          return (
            <>
              <div>{loading ? '문서 로딩중...' : '다운로드 하기'}</div>
              {/* {url} */}
            </>
          );
        }}
      </PDFDownloadLink>
    );
  };
  const downloadFile = (blob: Blob | MediaSource | null, fileName: string) => {
    if (blob === null) {
      return;
    }
    const link = document.createElement('a');
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  // const [pdfData, setPdfData] = useState();
  const [instance, updateInstance] = usePDF({ document: <MyDoc /> });

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>Something went wrong: {instance.error}</div>;
  return (
    <div className='col-sm-4 col-md-6'>
      <h2>출력</h2>
      <MyDoc />
      <a href={instance.url || undefined} download={`${title}.pdf`}>
        Download
      </a>
      {/* <PDFViewer width={'100%'} height={'50%'}>
        <MyDoc />
      </PDFViewer> */}

      {/* <BlobProvider document={<MyDoc />}>
        {({ blob, url, loading, error }) => {
          console.log(blob);
          console.log(url);
          console.log(loading);
          console.log(error);

          setPdfData(blob);
          // Do whatever you need with blob here
          return <div>There's something going on on the fly {loading}</div>;
        }}
      </BlobProvider> */}
      {/* <DownLoad /> */}
    </div>
  );
}
