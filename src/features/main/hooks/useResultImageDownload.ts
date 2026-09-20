'use client';

import { useCallback, useRef, useState } from 'react';

const useResultImageDownload = () => {
  const resultRef = useRef<HTMLDivElement>(null);
  const downloadingRef = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'success' | 'error' | null>(null);

  const closeDownloadToast = useCallback(() => setDownloadStatus(null), []);

  const handleDownloadImage = async () => {
    const target = resultRef.current;
    if (!target || downloadingRef.current) return;

    downloadingRef.current = true;
    setIsDownloading(true);
    setDownloadStatus(null);

    try {
      const { toPng } = await import('html-to-image');
      await document.fonts.ready;

      const image = await toPng(target, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.href = image;
      link.download = 'MarketBTI-상권-진단-결과.png';
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus('success');
    } catch {
      setDownloadStatus('error');
    } finally {
      downloadingRef.current = false;
      setIsDownloading(false);
    }
  };

  return {
    resultRef,
    isDownloading,
    downloadStatus,
    closeDownloadToast,
    handleDownloadImage,
  };
};

export default useResultImageDownload;
