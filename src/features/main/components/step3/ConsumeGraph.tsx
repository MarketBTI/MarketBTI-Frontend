'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import VolatilityAlert from './VolatilityAlert';
import type {
  DiagnosisConsumptionFlow,
  DiagnosisMarket,
} from '@/features/main/types/diagnosis';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

interface ConsumeGraphProps {
  data: DiagnosisConsumptionFlow[];
  market: DiagnosisMarket;
  warningMonth: string;
}

const ConsumeGraph = ({ data, market, warningMonth }: ConsumeGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const values = useMemo(
    () =>
      data
        .filter((item) => Number.isFinite(item.amount))
        .toSorted((a, b) => a.yearMonth.localeCompare(b.yearMonth)),
    [data],
  );
  const warningIndex = values.findIndex((item) => item.yearMonth === warningMonth);

  useEffect(() => {
    if (!canvasRef.current || values.length === 0) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: values.map((item) => Number(item.yearMonth.slice(5)) + '월'),
        datasets: [
          {
            data: values.map((item) => item.amount),
            borderColor: '#5db692',
            backgroundColor: '#5db692',
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 4,
            pointHitRadius: 4,
            cubicInterpolationMode: 'monotone',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: { padding: { top: 12, right: 12 } },
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            offset: false,
            grid: { display: false },
            border: { display: false },
            ticks: { autoSkip: false, maxRotation: 0, color: '#7A8092', font: { size: 13 } },
          },
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: '#e8eaec' },
            ticks: {
              maxTicksLimit: 5,
              padding: 12,
              color: '#7A8092',
              font: { size: 13 },
              callback: (value) => `${Number(value) / 100000000}억`,
            },
          },
        },
      },
      plugins: [
        {
          id: 'fixed-volatility-alert',
          afterDraw: (instance) => {
            const alert = alertRef.current;
            const point = instance.getDatasetMeta(0).data[warningIndex];
            if (!alert || !point) return;
            alert.style.visibility = 'visible';
            alert.style.left = point.x + 'px';
            alert.style.top = point.y + 'px';
            alert.style.setProperty(
              '--label-left',
              Math.max(0, Math.min(point.x - 40, instance.width - 80)) - point.x + 'px',
            );
            alert.style.setProperty(
              '--label-top',
              point.y > instance.chartArea.bottom - 46 ? '-42px' : '18px',
            );
          },
        },
      ],
    });
    return () => chart.destroy();
  }, [values, warningIndex]);

  return (
    <section className='flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] py-4 pl-1 pr-4'>
      <h1 className='text-black typo-subtitle-1 px-3'>
        {market.sido_name} {market.sigungu_name} · {market.industry_display_name} 소비 흐름
      </h1>

      {values.length === 0 ? (
        <p className='flex min-h-40 flex-1 items-center justify-center typo-caption-3 text-neutral-800'>
          표시할 소비 데이터가 없습니다.
        </p>
      ) : (
        <div className='relative min-h-40 flex-1'>
          <div className='absolute inset-0'>
            <canvas
              ref={canvasRef}
              role='img'
              aria-label={
                '월별 소비 흐름. ' +
                values
                  .map(
                    (item) =>
                      Number(item.yearMonth.slice(5)) + '월 ' + item.amount.toLocaleString() + '원',
                  )
                  .join(', ')
              }
            />
          </div>
          {warningIndex >= 0 && (
            <VolatilityAlert
              ref={alertRef}
              month={Number(values[warningIndex].yearMonth.slice(5))}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default ConsumeGraph;
