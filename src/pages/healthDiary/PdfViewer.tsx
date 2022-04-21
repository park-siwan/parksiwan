import ReactPDF from '@react-pdf/renderer';
import React, { ReactNode, useEffect, useState } from 'react';

//pdf viewer
import { Document as Document2, Page as Page2, pdfjs } from 'react-pdf';
import useWindowSize from '../../hooks/useWindowSize';
import { useRecoilValue } from 'recoil';
import { diaryData } from './store';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PrintDocs({
  instance,
}: {
  instance: ReactPDF.UsePDFInstance;
}) {
  const inputData = useRecoilValue(diaryData);
  const { title } = inputData;
  const windowSize = useWindowSize();

  //pdf viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

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
          width={windowSize.width / 3}
          // height={windowSize.height / 5}
        />
      </Document2>
      <a href={instance.url || undefined} download={`${title}.pdf`}>
        pdf 다운로드
      </a>
      {/* <PDFViewer width={'100%'} height={'50%'}>
        <MyDoc />
      </PDFViewer> */}
    </div>
  );
}
