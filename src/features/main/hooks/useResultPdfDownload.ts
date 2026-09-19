'use client';

import { useCallback, useRef, useState } from 'react';

const useResultPdfDownload = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const downloadingRef = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'success' | 'error' | null>(null);

  const closeDownloadToast = useCallback(() => setDownloadStatus(null), []);
  const handleDownloadPdf = async () => {
    const target = resultRef.current;
    if (!target || downloadingRef.current) return;

    downloadingRef.current = true;
    setIsDownloading(true);
    setDownloadStatus(null);

    try {
      const [{ toPng }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')]);
      await document.fonts.ready;
      const image = await toPng(target, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const { width, height } = pdf.getImageProperties(image);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const scale = Math.min((pageWidth - margin * 2) / width, (pageHeight - margin * 2) / height);
      const imageWidth = width * scale;
      const imageHeight = height * scale;

      pdf.addImage(
        image,
        'PNG',
        (pageWidth - imageWidth) / 2,
        (pageHeight - imageHeight) / 2,
        imageWidth,
        imageHeight,
      );
      await pdf.save('MarketBTI-상권-진단-결과.pdf', { returnPromise: true });
      setDownloadStatus('success');
    } catch {
      setDownloadStatus('error');
    } finally {
      downloadingRef.current = false;
      setIsDownloading(false);
    }
  };

  return { resultRef, isDownloading, downloadStatus, closeDownloadToast, handleDownloadPdf };
};

export default useResultPdfDownload;
